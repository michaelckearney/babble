package main

import (
	"embed"
	"encoding/json"
	"strings"
)

//go:embed backend
var presets embed.FS

var embed_dir = "backend"

// for frontend
func GetPresetResources() []PresetResource {

	order := []string{}
	raw_order, err := presets.ReadFile(embed_dir + "/resources/order.json")
	if err != nil {
		panic(err)
	}
	err = json.Unmarshal([]byte(raw_order), &order)
	if err != nil {
		panic(err)
	}

	result := []PresetResource{}
	for _, resource := range order {
		raw_module, err := presets.ReadFile(embed_dir + "/resources/" + resource + "/module.json")
		if err != nil {
			panic(err)
		}
		module := map[string]any{}
		err = json.Unmarshal([]byte(raw_module), &module)
		if err != nil {
			panic(err)
		}

		raw_svg, err := presets.ReadFile(embed_dir + "/resources/" + resource + "/icon.svg")
		if err != nil {
			panic(err)
		}
		svg := strings.Split(strings.Split(string(raw_svg), "<path d=\"")[1], "\"/>")[0]

		settings := []PresetResourceSetting{}
		for _, setting := range module["settings"].([]any) {
			options := []string{}
			for _, option := range setting.(map[string]any)["options"].([]any) {
				options = append(options, option.(string))
			}
			settings = append(settings, PresetResourceSetting{
				Title:   setting.(map[string]any)["title"].(string),
				Type:    setting.(map[string]any)["type"].(string),
				Options: options,
			})
		}
		result = append(result, PresetResource{
			Title:     resource,
			IconPath:  svg,
			IconColor: module["color"].(string),
			Settings:  settings,
		})
	}
	return result
}

func GetPresetProviders() []PresetProvider {
	order := []string{}
	raw_order, err := presets.ReadFile(embed_dir + "/providers/order.json")
	if err != nil {
		panic(err)
	}
	err = json.Unmarshal([]byte(raw_order), &order)
	if err != nil {
		panic(err)
	}

	result := []PresetProvider{}
	for _, p := range order {

		provider := map[string]any{}
		raw_provider, err := presets.ReadFile(embed_dir + "/providers/" + p + "/provider.json")
		if err != nil {
			panic(err)
		}
		err = json.Unmarshal([]byte(raw_provider), &provider)
		if err != nil {
			panic(err)
		}

		credentials := []PresetProviderCredential{}
		for _, credential := range provider["credentials"].([]any) {
			credentials = append(credentials, PresetProviderCredential{
				Label: credential.(map[string]any)["label"].(string),
				Type:  credential.(map[string]any)["type"].(string),
				Env:   credential.(map[string]any)["env"].(string),
				Value: "",
			})
		}

		raw_svg, err := presets.ReadFile(embed_dir + "/providers/" + p + "/icon.svg")
		if err != nil {
			panic(err)
		}
		iconPath := strings.Split(strings.Split(string(raw_svg), "<path d=\"")[1], "\"")[0]
		iconViewBox := strings.Split(strings.Split(string(raw_svg), "viewBox=\"")[1], "\"")[0]
		result = append(result, PresetProvider{
			Title:       p,
			IconPath:    iconPath,
			IconViewBox: iconViewBox,
			IconColor:   provider["color"].(string),
			Credentials: credentials,
		})
	}
	return result
}

// for backend
type Template struct {
	Main     string
	Function string
	Layer    string
}
type Resource struct {
	Main         string
	Variables    string
	Outputs      string
	Script       string
	Requirements string
}

func GetTemplate(provider string) Template {
	main := ""
	raw_main, err := presets.ReadFile(embed_dir + "/providers/" + provider + "/template/main.tf")
	if err == nil {
		main = string(raw_main)
	}

	function := ""
	raw_function, err := presets.ReadFile(embed_dir + "/providers/" + provider + "/template/function.py")
	if err == nil {
		function = string(raw_function)
	}

	layer := ""
	raw_layer, err := presets.ReadFile(embed_dir + "/providers/" + provider + "/template/layer.py")
	if err == nil {
		layer = string(raw_layer)
	}

	return Template{
		Main:     main,
		Function: function,
		Layer:    layer,
	}
}
func GetResource(provider string, resource string) Resource {
	main := ""
	raw_main, err := presets.ReadFile(embed_dir + "/resources/" + resource + "/" + provider + "/main.tf")
	if err == nil {
		main = string(raw_main)
	}

	variables := ""
	raw_variables, err := presets.ReadFile(embed_dir + "/resources/" + resource + "/" + provider + "/variables.tf")
	if err == nil {
		variables = string(raw_variables)
	}

	outputs := ""
	raw_outputs, err := presets.ReadFile(embed_dir + "/resources/" + resource + "/" + provider + "/outputs.tf")
	if err == nil {
		outputs = string(raw_outputs)
	}

	script := ""
	raw_script, err := presets.ReadFile(embed_dir + "/resources/" + resource + "/" + provider + "/script.py")
	if err == nil {
		script = string(raw_script)
	}

	requirements := ""
	raw_requirements, err := presets.ReadFile(embed_dir + "/resources/" + resource + "/" + provider + "/requirements.txt")
	if err == nil {
		requirements = string(raw_requirements)
	}

	return Resource{
		Main:         main,
		Variables:    variables,
		Outputs:      outputs,
		Script:       script,
		Requirements: requirements,
	}
}

// func GetTemplate(provider string) map[string]any {
// 	result := map[string]any{}

// 	main := ""
// 	raw_main, err := presets.ReadFile(embed_dir + "/providers/" + provider + "/template/main.tf")
// 	if err == nil {
// 		main = string(raw_main)
// 	}

// 	function := ""
// 	raw_function, err := presets.ReadFile(embed_dir + "/providers/" + provider + "/template/function.py")
// 	if err == nil {
// 		function = string(raw_function)
// 	}

// 	layer := ""
// 	raw_layer, err := presets.ReadFile(embed_dir + "/providers/" + provider + "/template/layer.py")
// 	if err == nil {
// 		layer = string(raw_layer)
// 	}

// 	// resources
// 	current_modules := []string{}

// 	return result
// }

// func getMain(provider string) (string, error) {
// 	content, err := presets.ReadFile("backend/providers/" + provider + "/template/main.tf")
// 	if err != nil {
// 		return "", err
// 	}
// 	return string(content), nil
// }
// func getLayer(provider string) (string, error) {
// 	content, err := presets.ReadFile("backend/providers/" + provider + "/template/layer.py")
// 	if err != nil {
// 		return "", err
// 	}
// 	return string(content), nil
// }
// func getFunction(provider string) (string, error) {
// 	content, err := presets.ReadFile("backend/providers/" + provider + "/template/function.py")
// 	if err != nil {
// 		return "", err
// 	}
// 	return string(content), nil
// }

// func getModuleScript(name string, provider string) (string, error) {
// 	content, err := presets.ReadFile("backend/modules/" + name + "/" + provider + "/script.py")
// 	if err != nil {
// 		return "", err
// 	}
// 	return string(content), nil
// }
// func getModuleMain(name string, provider string) (string, error) {
// 	content, err := presets.ReadFile("backend/modules/" + name + "/" + provider + "/main.tf")
// 	if err != nil {
// 		return "", err
// 	}
// 	return string(content), nil
// }
// func getModuleVariables(name string, provider string) (string, error) {
// 	content, err := presets.ReadFile("backend/modules/" + name + "/" + provider + "/variables.tf")
// 	if err != nil {
// 		return "", err
// 	}
// 	return string(content), nil
// }
// func getModuleOutputs(name string, provider string) (string, error) {
// 	content, err := presets.ReadFile("backend/modules/" + name + "/" + provider + "/outputs.tf")
// 	if err != nil {
// 		return "", err
// 	}
// 	return string(content), nil
// }
// func getModuleRequirements(name string, provider string) (string, error) {
// 	content, err := presets.ReadFile("backend/modules/" + name + "/" + provider + "/requirements.txt")
// 	if err != nil {
// 		return "", err
// 	}
// 	return string(content), nil
// }
