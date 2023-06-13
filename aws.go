package main

import (
	"encoding/hex"
	"strings"

	"golang.org/x/crypto/sha3"
	"gopkg.in/yaml.v2"
)

type FileConfig struct {
	Type     string
	Content  string
	Children map[string]FileConfig
}

func hash(s string) string {
	h := sha3.NewShake256()
	h.Write([]byte(s))
	output := make([]byte, 4)
	h.Read(output)
	return hex.EncodeToString(output)
}

func GetTerraformAws(config string, credentials []PresetProviderCredential) map[string]FileConfig {

	template := GetTemplate("aws")

	c := map[string]ServiceConfig{}
	err := yaml.Unmarshal([]byte(config), &c)
	if err != nil {
		c = map[string]ServiceConfig{}
	}
	for name, resource := range c {
		if resource.Settings == nil {
			resource.Settings = map[string]interface{}{}
			c[name] = resource
		}
		for title, setting := range resource.Settings {
			if setting == nil {
				c[name].Settings[title] = ""
			}
		}
	}

	// GENERATING MAIN.TF

	main := template.Main

	backend := "terraform {\n"
	backend += "\trequired_providers {\n"
	backend += "\t\taws = {\n"
	backend += "\t\t\tsource = \"hashicorp/aws\"\n"
	backend += "\t\t\tversion = \"4.52.0\"\n"
	backend += "\t\t}\n"
	backend += "\t}\n"
	backend += "\tbackend \"s3\" {\n"
	for _, credential := range credentials {
		if credential.Label == "S3 Bucket" {
			backend += "\t\tbucket = \"" + credential.Value + "\"\n"
		} else if credential.Label == "S3 Key" {
			backend += "\t\tkey = \"" + credential.Value + "\"\n"
		} else if credential.Label == "S3 Region" {
			backend += "\t\tregion = \"" + credential.Value + "\"\n"
		}
	}
	backend += "\t}\n"
	backend += "}\n"
	main = strings.Replace(main, "terraform {\n}", backend, -1)

	// adding dynamic local variables
	locals := "locals {\n"
	locals += "\tlambda_input = jsonencode({\n"
	locals += "\t\tbucket = aws_s3_bucket.layer.id\n"
	locals += "\t\tkey = \"layer.zip\"\n"

	// adding pip packages
	locals += "\t\tpackages = {\n"
	for k, v := range c {
		if v.Resource == "package" {
			locals += "\t\t\t" + k + " = <<-EOT\n"
			for _, line := range strings.Split(v.Settings["requirements"].(string), "\n") {
				locals += "\t\t\t" + line + "\n"
			}
			locals = strings.TrimSpace(locals)
			locals += "\n\t\t\tEOT\n"
		}
	}
	locals += "\t\t}\n"

	// adding pip requirements for modules
	locals += "\t\tmodules = {\n"
	module_packages := []string{}
	for _, v := range c {
		for _, module_package := range module_packages {
			if module_package == v.Resource {
				continue
			}
		}
		module_packages = append(module_packages, v.Resource)
		resource_preset := GetResource("aws", v.Resource)
		if resource_preset.Requirements == "" {
			continue
		}
		locals += "\t\t\t" + v.Resource + " = <<-EOT\n"
		for _, line := range strings.Split(resource_preset.Requirements, "\n") {
			locals += "\t\t\t" + line + "\n"
		}
		locals = strings.TrimSpace(locals)
		locals += "\n\t\t\tEOT\n"
	}
	locals += "\t\t}\n"
	locals += "\t})\n"

	// preparing endpoints for openapi specifications
	paths := []string{}
	methods := map[string][]string{}
	for _, v := range c {
		if v.Resource == "endpoint" {
			paths = append(paths, v.Settings["path"].(string))
			methods[v.Settings["path"].(string)] = []string{}
		}
	}
	for _, v := range c {
		if v.Resource == "endpoint" {
			methods[v.Settings["path"].(string)] = append(methods[v.Settings["path"].(string)], v.Settings["method"].(string))
		}
	}
	// adding openapi specifications to locals
	locals += "\tapi_input = jsonencode({\n"
	locals += "\t\topenapi = \"3.0.3\"\n"
	locals += "\t\tpaths = {\n"
	for _, path := range paths {
		locals += "\t\t\t\"" + path + "\" = {\n"
		for _, method := range methods[path] {
			locals += "\t\t\t\t\"" + strings.ToLower(method) + "\" = {\n"
			locals += "\t\t\t\t\tx-amazon-apigateway-integration: {\n"

			locals += "\t\t\t\t\t\ttype: \"AWS_PROXY\"\n"
			locals += "\t\t\t\t\t\turi: aws_lambda_function.main.invoke_arn\n"
			locals += "\t\t\t\t\t\thttpMethod: \"POST\"\n"
			locals += "\t\t\t\t\t\tpassthroughBehavior: \"when_no_match\"\n"

			locals += "\t\t\t\t\t}\n"
			locals += "\t\t\t\t}\n"
		}
		locals += "\t\t\t}\n"
	}
	locals += "\t\t}\n"
	locals += "\t})\n"
	locals += "}"

	// adding locals to main
	main = strings.Replace(main, "locals {\n}", locals, -1)

	// adding layer lambda function source code
	main += "data \"archive_file\" \"layer\" {\n"
	main += "\ttype = \"zip\"\n"
	main += "\toutput_path = \"${path.module}/layer.zip\"\n"
	main += "\tsource {\n"
	main += "\t\tfilename = \"main.py\"\n"
	main += "\t\tcontent = <<-EOT\n"
	for _, line := range strings.Split(template.Layer, "\n") {
		main += "\t\t" + line + "\n"
	}
	main += "\t\tEOT\n"
	main += "\t}\n"
	main += "}\n"

	// preparing imports for main lambda function source code
	imports := "import sys\n"
	for _, resource := range c {
		resource_template := GetResource("aws", resource.Resource)
		module_script := resource_template.Script
		if module_script == "" {
			continue
		}
		imports += "sys.path.append('/opt/python/" + resource.Resource + "')\n"
	}
	for name, resource := range c {
		if resource.Resource == "endpoint" || resource.Resource == "routine" {
			imports += "import _" + hash(name) + "\n"
		}
	}
	// preparing endpoints for main lambda function source code
	endpoints := "endpoints = {\n"
	for _, path := range paths {
		endpoints += "\t\"" + path + "\": {\n"
		for _, method := range methods[path] {
			for name, resource := range c {
				if resource.Resource == "endpoint" {
					if resource.Settings["path"].(string) == path && resource.Settings["method"].(string) == method {
						endpoints += "\t\t'" + method + "': _" + hash(name) + ",\n"
					}
				}
			}
		}
		endpoints += "\t},\n"
	}
	endpoints += "}\n"

	// adding main lambda function source code
	main += "data \"archive_file\" \"main\" {\n"
	main += "\ttype = \"zip\"\n"
	main += "\toutput_path = \"${path.module}/main.zip\"\n"
	main += "\tsource {\n"
	main += "\t\tfilename = \"main.py\"\n"
	main += "\t\tcontent = <<-EOT\n"

	for _, line := range strings.Split(imports+endpoints+template.Function, "\n") {
		main += "\t\t" + line + "\n"
	}
	main += "\t\tEOT\n"
	main += "\t}\n"

	// adding source code for modules
	for name, resource := range c {

		resource_template := GetResource("aws", resource.Resource)
		module_script := resource_template.Script
		if module_script == "" {
			continue
		}
		// module_script = "import sys\nsys.path.append('/opt/python/" + resource.Resource + "')\n" + module_script
		module_script = strings.Replace(module_script, "${", "${module."+name+".", -1)
		inline_script := ""
		for _, line := range strings.Split(module_script, "\n") {
			inline_script += "\t\t" + line + "\n"
		}
		main += "\tsource {\n"
		main += "\t\tfilename = \"_" + hash(name) + ".py\"\n"
		main += "\t\tcontent = <<-EOT\n"
		main += inline_script
		main += "\t\tEOT\n"
		main += "\t}\n"
	}

	// adding source code for scripts, routines, and endpoints
	for name, resource := range c {
		if resource.Resource == "script" || resource.Resource == "routine" || resource.Resource == "endpoint" {
			// resource_script := "import sys\n"
			// for k1, v1 := range c {
			// 	if v1.Resource == "package" {
			// 		resource_script += "sys.path.append('/opt/python/" + k1 + "')\n"
			// 	}
			// }
			resource_script := "${jsondecode(aws_lambda_invocation.layer.result)}\n"
			for k1, v1 := range c {
				if k1 != name && v1.Resource != "package" {
					if v1.Resource == "script" || v1.Resource == "routine" || v1.Resource == "endpoint" {
						resource_script += "import _" + hash(k1) + " as " + k1 + "\n"
					} else if v1.Resource == "library" {
						resource_script += "import " + v1.Settings["import"].(string) + " as " + k1 + "\n"
					} else {
						resource_script += "import _" + hash(k1) + "\n"
						resource_script += k1 + " = _" + hash(k1) + ".Module()\n"
					}
				}
			}
			resource_script += resource.Settings["content"].(string)

			inline_script := ""
			for _, line := range strings.Split(resource_script, "\n") {
				inline_script += "\t\t" + line + "\n"
			}
			main += "\tsource {\n"
			main += "\t\tfilename = \"_" + hash(name) + ".py\"\n"
			main += "\t\tcontent = <<-EOT\n"
			main += inline_script
			main += "\t\tEOT\n"
			main += "\t}\n"
		}
	}

	main += "}\n"

	// adding modules to main.tf
	for name, resource := range c {
		resource_template := GetResource("aws", resource.Resource)
		if resource_template.Main == "" {
			continue
		}
		main += "module \"" + name + "\" {\n"
		main += "\tsource = \"./modules/" + resource.Resource + "\"\n"
		main += "\tname = \"" + name + "\"\n"
		for setting, value := range resource.Settings {
			main += "\t" + setting + " = \"" + value.(string) + "\"\n"
		}
		main += "}\n"
	}

	// ADDING MODULE FOLDERS

	module_folders := map[string]FileConfig{}
	current_modules := []string{}
	for _, resource := range c {
		resource_template := GetResource("aws", resource.Resource)
		if resource_template.Main == "" {
			continue
		}
		already_exists := false
		for _, module := range current_modules {
			if module == resource.Resource {
				already_exists = true
				break
			}
		}
		if already_exists {
			continue
		}
		module_folders[resource.Resource] = FileConfig{
			Type:    "folder",
			Content: "",
			Children: map[string]FileConfig{
				"main.tf": FileConfig{
					Type:     "file",
					Content:  resource_template.Main,
					Children: map[string]FileConfig{},
				},
				"variables.tf": FileConfig{
					Type:     "file",
					Content:  resource_template.Variables,
					Children: map[string]FileConfig{},
				},
				"outputs.tf": FileConfig{
					Type:     "file",
					Content:  resource_template.Outputs,
					Children: map[string]FileConfig{},
				},
			},
		}
	}

	// OUTPUT

	result := map[string]FileConfig{
		"main.tf": FileConfig{
			Type:     "file",
			Content:  main,
			Children: map[string]FileConfig{},
		},
		"function.py": FileConfig{
			Type:     "file",
			Content:  template.Function,
			Children: map[string]FileConfig{},
		},
		"layer.py": FileConfig{
			Type:     "file",
			Content:  template.Layer,
			Children: map[string]FileConfig{},
		},
		"modules": FileConfig{
			Type:     "folder",
			Content:  "",
			Children: module_folders,
		},
	}

	return result
}
