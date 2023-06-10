package main

import (
	"encoding/json"
)

func CreateService(path string, service string) {
	// fmt.Println("CreateService")
	if !PathExists(GetHome() + "/" + path + "/.babble") {
		AddFolder(GetHome() + "/" + path + "/.babble")
	}
	if !PathExists(GetHome() + "/" + path + "/.babble/" + service) {
		AddFolder(GetHome() + "/" + path + "/.babble/" + service)
	}
	statusOutput, _ := json.Marshal(ServiceStatus{
		Status:  "inactive",
		Message: "",
		Url:     "",
	})
	WriteFile(GetHome()+"/"+path+"/.babble/"+service+"/status.json", string(statusOutput))
	WriteFile(GetHome()+"/"+path+"/.babble/"+service+"/config.yaml", "")
}
func DeleteService(path string, service string) {
	// fmt.Println("DeleteService")
	home := GetHome()
	if PathExists(home + "/" + path + "/.babble/" + service) {
		RemoveFolder(home + "/" + path + "/.babble/" + service)
	}
	if PathExists(home + "/" + path + "/" + service) {
		RemoveFile(home + "/" + path + "/" + service)
	}
	if len(GetFolders(home+"/"+path+"/.babble")) == 0 {
		RemoveFolder(home + "/" + path + "/.babble")
	}
}
func Activate(config string, path string, service string, provider string, credentials []PresetProviderCredential) ServiceStatus {

	if PathExists(GetHome() + path + "/.babble/" + service + "/terraform") {
		for _, folder := range GetFolders(GetHome() + path + "/.babble/" + service + "/terraform") {
			if folder != ".terraform" {
				RemoveFolder(GetHome() + path + "/.babble/" + service + "/terraform/" + folder)
			}
		}
		for _, file := range GetFiles(GetHome() + path + "/.babble/" + service + "/terraform") {
			if file != ".terraform.lock.hcl" && file != "terraform.tfstate" && file != "terraform.tfstate.backup" {
				RemoveFile(GetHome() + path + "/.babble/" + service + "/terraform/" + file)
			}
		}
	}

	c := map[string]FileConfig{}
	if provider == "aws" {
		c = GetTerraformAws(config, credentials)
	}
	LoadFiles(GetHome()+path+"/.babble/"+service, "terraform", c)

	env := map[string]string{}
	for _, credential := range credentials {
		if credential.Env != "" {
			env[credential.Env] = credential.Value
		}
	}

	code, output := TerraformInit(GetHome()+path+"/.babble/"+service+"/terraform", env)

	if code != 0 {
		return ServiceStatus{
			Status:  "error",
			Message: output,
			Url:     "",
		}
	}

	code, output = TerraformApply(GetHome()+path+"/.babble/"+service+"/terraform", env)

	if code == 0 {
		url := ReadFile(GetHome() + path + "/.babble/" + service + "/terraform/url.txt")
		return ServiceStatus{
			Status:  "active",
			Message: output,
			Url:     url,
		}
	} else {
		return ServiceStatus{
			Status:  "error",
			Message: output,
			Url:     "",
		}
	}
}
func Deactivate(path string, service string, credentials []PresetProviderCredential) ServiceStatus {
	// fmt.Println("DeactivateService")

	env := map[string]string{}
	for _, credential := range credentials {
		if credential.Env != "" {
			env[credential.Env] = credential.Value
		}
	}

	code, output := TerraformInit(GetHome()+path+"/.babble/"+service+"/terraform", env)

	if code != 0 {
		return ServiceStatus{
			Status:  "error",
			Message: output,
			Url:     "",
		}
	}

	code, output = TerraformDestroy(GetHome()+path+"/.babble/"+service+"/terraform", env)

	if code == 0 {
		return ServiceStatus{
			Status:  "inactive",
			Message: output,
			Url:     "",
		}
	} else {
		return ServiceStatus{
			Status:  "error",
			Message: output,
			Url:     "",
		}
	}
}

func (a *App) AddService(state string, name string) string {
	// fmt.Println("AddService")
	s := LoadState(state)
	s.Dialog = ""
	s.Service = Service{
		File:          name + ".yaml",
		Title:         name,
		Subtitle:      "inactive",
		IconPath:      "",
		IconColor:     "",
		ConfigSaved:   "",
		ConfigCurrent: "",
		Status: ServiceStatus{
			Status:  "inactive",
			Message: "",
			Url:     "",
		},
		Resources: []ServiceResource{},
	}
	s.Services = append(s.Services, s.Service)
	s = UpdateOutput(s)

	CreateService(s.Folder, s.Service.Title)

	// if !PathExists(GetHome() + "/" + s.Folder + "/.babble") {
	// 	AddFolder(GetHome() + "/" + s.Folder + "/.babble")
	// }
	// if !PathExists(GetHome() + "/" + s.Folder + "/.babble/" + name) {
	// 	AddFolder(GetHome() + "/" + s.Folder + "/.babble/" + name)
	// }
	// statusOutput, _ := json.Marshal(s.Service.Status)
	// WriteFile(GetHome()+"/"+s.Folder+"/.babble/"+name+"/status.json", string(statusOutput))
	// WriteFile(GetHome()+"/"+s.Folder+"/"+name+".yaml", s.Service.ConfigCurrent)

	return DumpState(s)
}
func (a *App) RemoveService(state string) {
	// fmt.Println("RemoveService")
	s := LoadState(state)
	s.Dialog = ""
	if s.Service.Status.Status == "inactive" {
		DeleteService(s.Folder, s.Service.Title)
	} else {
		credentials := []PresetProviderCredential{}
		for _, provider := range s.Presets.Providers {
			if provider.Title == s.Provider {
				credentials = provider.Credentials
				break
			}
		}
		Deactivate(s.Folder, s.Service.Title, credentials)
		DeleteService(s.Folder, s.Service.Title)
	}
}
func (a *App) ActivateService(state string) {
	// fmt.Println("ActivateService")

	s := LoadState(state)

	credentials := []PresetProviderCredential{}
	for _, provider := range s.Presets.Providers {
		if provider.Title == s.Provider {
			credentials = provider.Credentials
			break
		}
	}

	status := Activate(s.Service.ConfigCurrent, s.Folder, s.Service.Title, s.Provider, credentials)

	raw_status, err := json.Marshal(status)
	if err != nil {
		panic(err)
	}
	WriteFile(GetHome()+"/"+s.Folder+"/.babble/"+s.Service.Title+"/status.json", string(raw_status))
}
func (a *App) DeactivateService(state string) {
	// fmt.Println("DeactivateService")

	s := LoadState(state)

	credentials := []PresetProviderCredential{}
	for _, provider := range s.Presets.Providers {
		if provider.Title == s.Provider {
			credentials = provider.Credentials
			break
		}
	}

	status := Deactivate(s.Folder, s.Service.Title, credentials)

	raw_status, err := json.Marshal(status)
	if err != nil {
		panic(err)
	}
	WriteFile(GetHome()+"/"+s.Folder+"/.babble/"+s.Service.Title+"/status.json", string(raw_status))
}

func (a *App) ImportService(state string, file string) string {
	s := LoadState(state)
	s.Dialog = ""
	path := GetHome() + "/" + s.Navigation.Folder + "/" + file
	file_content := ReadFile(path)
	s.Service.ConfigCurrent = file_content
	for _, service := range s.Services {
		if service.Title == s.Service.Title {
			service.ConfigCurrent = file_content
		}
	}
	WriteFile(GetHome()+"/"+s.Folder+"/.babble/"+s.Service.Title+"/config.yaml", file_content)
	s = LoadWorkspace(s)
	return DumpState(s)
}
func (a *App) ExportService(state string, file string) string {
	s := LoadState(state)
	s.Dialog = ""
	path := GetHome() + "/" + s.Navigation.Folder + "/" + file
	WriteFile(path, s.Service.ConfigCurrent)
	return DumpState(s)
}
