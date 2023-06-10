package main

import (
	"encoding/json"
	"fmt"
	"strings"

	"gopkg.in/yaml.v2"
)

func (a *App) NewState() string {
	result := State{
		Page:       "launch",
		Workspace:  "",
		Folder:     "",
		Files:      []string{},
		Subfolders: []string{},
		Services:   []Service{},
		Service: Service{
			File:          "",
			Title:         "",
			Subtitle:      "",
			IconPath:      "",
			IconColor:     "",
			ConfigSaved:   "",
			ConfigCurrent: "",
			Status: ServiceStatus{
				Status:  "",
				Message: "",
				Url:     "",
			},
			Resources: []ServiceResource{},
		},
		Resource: ServiceResource{
			Title:     "",
			Subtitle:  "",
			IconPath:  "",
			IconColor: "",
			Expanded:  false,
			Settings:  []ServiceResourceSetting{},
		},
		Setting: ServiceResourceSetting{
			Title:   "",
			Type:    "",
			Value:   "",
			Options: []string{},
		},
		Dialog:             "",
		ContextMenuType:    "",
		ContextMenu:        "",
		ContextMenuOptions: []string{},
		ContextMenuX:       0,
		ContextMenuY:       0,
		Presets: Preset{
			Resources: []PresetResource{},
			Providers: []PresetProvider{},
			Icons:     []PresetIcon{},
		},
		Action:   "",
		Provider: "aws",
		Navigation: Navigation{
			Folder:  "",
			Files:   []string{},
			Folders: []string{},
		},
		Font:  14,
		Size:  "small",
		Theme: "dark",
		Error: false,
	}
	return DumpState(result)
}

func LoadState(state string) State {
	var s State
	err := json.Unmarshal([]byte(state), &s)
	if err != nil {
		panic(err)
	}
	return s
}
func DumpState(state State) string {
	output, err := json.Marshal(state)
	if err != nil {
		panic(err)
	} else {
		return string(output)
	}
}
func LoadWorkspace(state State) State {
	// fmt.Println("LoadWorkspace")

	state.Files = []string{}
	state.Subfolders = []string{}
	state.Services = []Service{}

	// iterating over files
	files := GetFiles(GetHome() + "/" + state.Folder)
	for _, file := range files {
		if file[0] != '.' {
			path := GetHome() + "/" + state.Folder
			state.Files = append(state.Files, path+"/"+file)
		}
	}
	folders := GetFolders(GetHome() + "/" + state.Folder)
	// iterating over subfolders
	for _, f := range folders {
		if f[0] != '.' {
			state.Subfolders = append(state.Subfolders, f)
		} else if f == ".babble" {
			subfolders := GetFolders(GetHome() + "/" + state.Folder + "/.babble")
			// iterating over project folders in .babble
			for _, sf := range subfolders {

				var status ServiceStatus
				raw_status := ReadFile(GetHome() + "/" + state.Folder + "/.babble/" + sf + "/status.json")
				err := json.Unmarshal([]byte(raw_status), &status)
				if err != nil {
					panic(err)
				}

				var config map[string]ServiceConfig
				raw_config := ""
				if PathExists(GetHome() + "/" + state.Folder + "/.babble/" + sf + "/config.yaml") {
					raw_config = ReadFile(GetHome() + "/" + state.Folder + "/.babble/" + sf + "/config.yaml")
				}
				err = yaml.Unmarshal([]byte(raw_config), &config)
				if err != nil {
					// fmt.Println("\n\n\n")
					// fmt.Println(raw_config)
					// fmt.Println("\n\n\n")
					config = map[string]ServiceConfig{}
				}

				config_order := []string{}
				for _, line := range strings.Split(raw_config, "\n") {
					if line != "" {
						if line[0] != ' ' {
							config_order = append(config_order, strings.Split(line, ":")[0])
						}
					}
				}

				resources := []ServiceResource{}
				index := 0
				for _, name := range config_order {
					item := config[name]
					var resource_preset PresetResource
					var resource_preset_match bool
					resource_preset_match = false
					for _, r := range state.Presets.Resources {
						if r.Title == item.Resource {
							resource_preset = r
							resource_preset_match = true
							break
						}
					}
					var resource ServiceResource
					if resource_preset_match {
						resource_settings := []ServiceResourceSetting{}
						for _, setting := range resource_preset.Settings {
							value, ok := item.Settings[setting.Title].(string)
							if !ok {
								value = ""
							}
							resource_settings = append(resource_settings, ServiceResourceSetting{
								Title:   setting.Title,
								Type:    setting.Type,
								Value:   value,
								Options: setting.Options,
							})
						}
						resource = ServiceResource{
							Index:     index,
							Title:     name,
							Subtitle:  item.Resource,
							IconPath:  resource_preset.IconPath,
							IconColor: resource_preset.IconColor,
							Expanded:  false,
							Settings:  resource_settings,
						}
						index++
					} else {
						resource = ServiceResource{
							Index:     index,
							Title:     name,
							Subtitle:  item.Resource,
							IconPath:  "",
							IconColor: "",
							Expanded:  false,
							Settings:  []ServiceResourceSetting{},
						}
						index++
					}
					resources = append(resources, resource)
				}
				state.Services = append(state.Services, Service{
					File:          sf + ".yaml",
					Title:         sf,
					Subtitle:      status.Status,
					IconPath:      "",
					IconColor:     "",
					ConfigSaved:   raw_config,
					ConfigCurrent: raw_config,
					Status:        status,
					Resources:     resources,
				})
			}
		}
	}
	return state
}

func UpdateOutput(state State) State {
	// fmt.Println("UpdateOutput")
	newConfig := ""
	for _, resource := range state.Service.Resources {
		if resource.Title == "" {
			continue
		}
		newConfig += resource.Title + ":\n"
		newConfig += "  resource: " + resource.Subtitle + "\n"
		newConfig += "  settings:\n"
		for _, setting := range resource.Settings {
			newConfig += "    " + setting.Title + ": "
			if setting.Type != "code" {
				newConfig += "'" + setting.Value + "'\n"
			} else {
				newConfig += "|\n"
				code := strings.Join(strings.Split(strings.TrimSpace(setting.Value), "\n"), "\n      ")
				if strings.TrimSpace(code) != "" {
					newConfig += "      " + code + "\n"
				}

				//newConfig += strings.Join(strings.Split(strings.TrimSpace(setting.Value), "\n"), "\n      ") + "\n"
			}
		}
	}
	newConfig = strings.TrimSpace(newConfig)
	state.Service.ConfigCurrent = newConfig
	for i, service := range state.Services {
		if service.Title == state.Service.Title {
			state.Services[i] = state.Service
		}
	}
	return state
}

func (a *App) ClickOpenWorkspace(state string) string {
	// fmt.Println("ClickOpenWorkspace")
	s := LoadState(state)
	s.Dialog = "openWorkspace"
	s.Folder = ""
	s.Files = []string{}
	s.Subfolders = []string{}
	s.Services = []Service{}
	s.Presets.Resources = GetPresetResources()
	s.Presets.Providers = GetPresetProviders()
	s.Page = "workspace"

	s = LoadWorkspace(s)

	return DumpState(s)
}
func (a *App) ViewWorkspaceChild(state string, workspace string) string {
	// fmt.Println("ViewWorkspaceChild")
	s := LoadState(state)
	s.ContextMenu = ""
	s.ContextMenuType = ""
	// if !PathExists(GetHome() + "/" + s.Folder + "/.babble/" + workspace) {
	// 	return state
	// }
	s.Workspace = workspace
	s.Folder += "/" + workspace
	s.Files = []string{}
	s.Subfolders = []string{}
	s.Services = []Service{}
	s.Service = Service{
		File:          "",
		Title:         "",
		Subtitle:      "",
		IconPath:      "",
		IconColor:     "",
		ConfigSaved:   "",
		ConfigCurrent: "",
		Status: ServiceStatus{
			Status:  "",
			Message: "",
			Url:     "",
		},
		Resources: []ServiceResource{},
	}

	s = LoadWorkspace(s)

	return DumpState(s)
}
func (a *App) ViewWorkspaceParent(state string) string {
	// fmt.Println("ViewWorkspaceParent")
	s := LoadState(state)
	s.Page = "workspace"
	s.ContextMenuType = ""
	s.ContextMenu = ""
	if s.Folder == "" {
		return state
	}
	s.Folder = strings.Join(
		strings.Split(s.Folder, "/")[0:len(strings.Split(s.Folder, "/"))-1],
		"/",
	)
	if s.Folder == "" {
		s.Workspace = ""
	} else {
		s.Workspace = strings.Split(s.Folder, "/")[len(strings.Split(s.Folder, "/"))-1]
	}
	s.Files = []string{}
	s.Subfolders = []string{}
	s.Services = []Service{}
	s.Service = Service{
		File:          "",
		Title:         "",
		Subtitle:      "",
		IconPath:      "",
		IconColor:     "",
		ConfigSaved:   "",
		ConfigCurrent: "",
		Status: ServiceStatus{
			Status:  "",
			Message: "",
			Url:     "",
		},
		Resources: []ServiceResource{},
	}
	s.Resource = ServiceResource{
		Title:     "",
		Subtitle:  "",
		IconPath:  "",
		IconColor: "",
		Expanded:  false,
		Settings:  []ServiceResourceSetting{},
	}
	s.Setting = ServiceResourceSetting{
		Title:   "",
		Type:    "",
		Value:   "",
		Options: []string{},
	}

	s = LoadWorkspace(s)

	return DumpState(s)
}
func (a *App) OpenWorkspace(state string) string {
	// fmt.Println("OpenWorkspace")
	s := LoadState(state)
	s.Dialog = ""
	s.Page = "workspace"
	return DumpState(s)
}
func (a *App) ViewService(state string, service string) string {
	// fmt.Println("ViewService")
	s := LoadState(state)
	s.ContextMenu = ""
	s.ContextMenuType = ""
	for _, _s := range s.Services {
		if _s.Title == service {
			s.Service = _s
		}
	}
	return DumpState(s)
}
func (a *App) OpenService(state string) string {
	// fmt.Println("OpenService")
	s := LoadState(state)
	s.Dialog = ""
	s.Page = "service"
	return DumpState(s)
}
func (a *App) CloseService(state string) string {
	// fmt.Println("CloseService")
	s := LoadState(state)
	s.Page = "workspace"
	s.Resource = ServiceResource{
		Title:     "",
		Subtitle:  "",
		IconPath:  "",
		IconColor: "",
		Expanded:  false,
		Settings:  []ServiceResourceSetting{},
	}
	s.Setting = ServiceResourceSetting{
		Title:   "",
		Type:    "",
		Value:   "",
		Options: []string{},
	}
	return DumpState(s)
}
func (a *App) OpenContextMenuAddService(state string, x int, y int) string {
	// fmt.Println("OpenContextMenuAddService")
	s := LoadState(state)
	s.ContextMenuType = "addService"
	s.ContextMenuX = x
	s.ContextMenuY = y
	return DumpState(s)
}
func (a *App) HandleContextMenuAddService(state string, option string) string {
	// fmt.Println("HandleContextMenuAddService")
	s := LoadState(state)
	s.ContextMenu = ""
	s.ContextMenuType = ""
	if option == "service" {
		s.Dialog = "addService"
	} else if option == "folder" {
		s.Dialog = "addFolder"
	}
	return DumpState(s)
}
func (a *App) CloseContextMenuAddService(state string) string {
	// fmt.Println("CloseContextMenuAddService")
	s := LoadState(state)
	s.ContextMenu = ""
	s.ContextMenuType = ""
	return DumpState(s)
}

func (a *App) AddFolder(state string, name string) string {
	// fmt.Println("AddFolder")
	s := LoadState(state)
	s.Dialog = ""

	if !PathExists(GetHome() + "/" + s.Folder + "/" + name) {
		AddFolder(GetHome() + "/" + s.Folder + "/" + name)
		s.Subfolders = append(s.Subfolders, name)
	}

	return DumpState(s)
}
func (a *App) OpenContextMenuService(state string, service string, x int, y int) string {
	// fmt.Println("OpenContextMenuService")
	s := LoadState(state)
	s.ContextMenuType = "service"
	s.ContextMenu = service
	s.ContextMenuX = x
	s.ContextMenuY = y
	for _, _s := range s.Services {
		if _s.Title == service {
			s.Service = _s
		}
	}
	return DumpState(s)
}
func (a *App) HandleContextMenuService(state string, service string, option string) string {
	// fmt.Println("HandleContextMenuService")
	s := LoadState(state)
	s.ContextMenuType = ""
	s.ContextMenu = ""
	option = strings.ToLower(option)
	if option == "copy url" {

	} else if option == "edit" {
		s.Page = "service"
	} else if option == "exit" {
		s.Page = "workspace"
	} else if option == "activate" {
		s.Dialog = "activateCredentials"
	} else if option == "reactivate" {
		s.Dialog = "activateCredentials"
	} else if option == "deactivate" {
		s.Dialog = "deactivateCredentials"
	} else if option == "import" {
		s.Dialog = "importSource"
		s = StartNavigating(s)
	} else if option == "export" {
		s.Dialog = "exportDestination"
		s = StartNavigating(s)
	} else if option == "delete" {
		if s.Service.Status.Status != "inactive" {
			s.Dialog = "deleteCredentials"
		} else {
			s.Dialog = ""
			DeleteService(s.Folder, s.Service.Title)
			s = LoadWorkspace(s)
		}
	} else if option == "view error logs" {
		s.Error = true
	}
	return DumpState(s)
}
func (a *App) HandleActivateProvider(state string, provider string) string {
	// fmt.Println("HandleActivateProvider")
	s := LoadState(state)
	s.Provider = provider
	s.Dialog = "activateCredentials"
	return DumpState(s)
}
func (a *App) HandleActivateCredentials(state string) string {
	// fmt.Println("HandleActivateCredentials")
	s := LoadState(state)
	s.Dialog = ""
	s.Service.Status.Status = "activating"
	s.Service.Subtitle = "activating"
	for i, _s := range s.Services {
		if _s.Title == s.Service.Title {
			s.Services[i].Status.Status = "activating"
			s.Services[i].Subtitle = "activating"
		}
	}
	saveStatus(s)
	return DumpState(s)
}
func (a *App) HandleDeactivateCredentials(state string) string {
	// fmt.Println("HandleDeactivateCredentials")
	s := LoadState(state)
	s.Dialog = ""
	s.Service.Status.Status = "deactivating"
	s.Service.Subtitle = "deactivating"
	for i, _s := range s.Services {
		if _s.Title == s.Service.Title {
			s.Services[i].Status.Status = "deactivating"
			s.Services[i].Subtitle = "deactivating"
		}
	}
	saveStatus(s)
	return DumpState(s)
}
func (a *App) HandleDeleteCredentials(state string) string {
	// fmt.Println("HandleDeleteCredentials")
	s := LoadState(state)
	s.Dialog = ""
	s.Service.Status.Status = "deleting"
	s.Service.Subtitle = "deleting"
	for i, _s := range s.Services {
		if _s.Title == s.Service.Title {
			s.Services[i].Status.Status = "deleting"
			s.Services[i].Subtitle = "deleting"
		}
	}
	saveStatus(s)
	return DumpState(s)
}
func (a *App) CloseContextMenuService(state string) string {
	// fmt.Println("CloseContextMenuService")
	s := LoadState(state)
	s.ContextMenu = ""
	s.ContextMenuType = ""
	return DumpState(s)
}
func (a *App) OpenMenuService(state string) string {
	// fmt.Println("OpenMenuService")
	s := LoadState(state)
	s.ContextMenuType = "serviceMenu"
	s.ContextMenu = s.Service.Title
	return DumpState(s)
}
func (a *App) CloseDialog(state string) string {
	// fmt.Println("CloseDialog")
	s := LoadState(state)
	s.Dialog = ""
	return DumpState(s)
}

func (a *App) ChangeCredentialValue(state string, provider string, credential string, value string) string {
	// fmt.Println("ChangeCredentialValue")
	s := LoadState(state)
	for i, p := range s.Presets.Providers {
		if p.Title == provider {
			for j, c := range p.Credentials {
				if c.Label == credential {
					s.Presets.Providers[i].Credentials[j].Value = value
					break
				}
			}
			break
		}
	}
	return DumpState(s)
}

func (a *App) OpenContextMenuAddResource(state string, x int, y int) string {
	// fmt.Println("OpenContextMenuAddResource")
	s := LoadState(state)
	s.ContextMenuType = "addResource"
	s.ContextMenuX = x
	s.ContextMenuY = y
	return DumpState(s)
}
func (a *App) HandleContextMenuAddResource(state string, option string) string {
	// fmt.Println("HandleContextMenuAddResource")
	s := LoadState(state)
	s.ContextMenu = ""
	s.ContextMenuType = ""

	for _, r := range s.Presets.Resources {
		if r.Title == option {
			newResource := ServiceResource{
				Index:     len(s.Service.Resources),
				Title:     "",
				Subtitle:  r.Title,
				IconPath:  r.IconPath,
				IconColor: r.IconColor,
				Expanded:  true,
				Settings:  []ServiceResourceSetting{},
			}
			for _, setting := range r.Settings {
				newResource.Settings = append(newResource.Settings, ServiceResourceSetting{
					Title:   setting.Title,
					Type:    setting.Type,
					Value:   "",
					Options: setting.Options,
				})
			}
			s.Service.Resources = append(s.Service.Resources, newResource)
			for i, service := range s.Services {
				if service.Title == s.Service.Title {
					s.Services[i].Resources = s.Service.Resources
				}
			}
			s = UpdateOutput(s)
		}
	}

	return DumpState(s)
}
func (a *App) CloseContextMenuAddResource(state string) string {
	// fmt.Println("CloseContextMenuAddResource")
	s := LoadState(state)
	s.ContextMenu = ""
	s.ContextMenuType = ""
	return DumpState(s)
}
func (a *App) OpenContextMenuResource(state string, resource string, x int, y int) string {
	// fmt.Println("OpenContextMenuResource")
	s := LoadState(state)
	s.ContextMenuType = "resource"
	s.ContextMenu = resource
	s.ContextMenuX = x
	s.ContextMenuY = y
	return DumpState(s)
}
func (a *App) HandleContextMenuResource(state string, resource string, option string) string {
	// fmt.Println("HandleContextMenuResource")
	s := LoadState(state)
	s.ContextMenuType = ""
	s.ContextMenu = ""

	if option == "delete" {
		for i, r := range s.Service.Resources {
			if fmt.Sprintf("%v", r.Index) == resource {
				s.Service.Resources = append(s.Service.Resources[:i], s.Service.Resources[i+1:]...)
				s = UpdateOutput(s)
				break
			}
		}
	}
	return DumpState(s)
}
func (a *App) CloseContextMenuResource(state string) string {
	// fmt.Println("CloseContextMenuResource")
	s := LoadState(state)
	s.ContextMenu = ""
	s.ContextMenuType = ""
	return DumpState(s)
}
func (a *App) ReorderResources(state string, resources string) string {
	// fmt.Println("ReorderResources")
	s := LoadState(state)
	err := json.Unmarshal([]byte(resources), &s.Service.Resources)
	if err != nil {
		panic(err)
	}
	s = UpdateOutput(s)
	return DumpState(s)
}
func (a *App) ExpandResource(state string, resource int) string {
	// fmt.Println("ExpandResource")
	s := LoadState(state)
	for i, r := range s.Service.Resources {
		if r.Index == resource {
			s.Service.Resources[i].Expanded = !s.Service.Resources[i].Expanded
		}
	}
	s.ContextMenu = ""
	s.ContextMenuType = ""
	return DumpState(s)
}
func (a *App) ChangeResourceName(state string, resource int, name string) string {
	// fmt.Println("ChangeResourceName")
	s := LoadState(state)
	for i, r := range s.Service.Resources {
		if r.Index == resource {
			s.Service.Resources[i].Title = name
		}
	}
	s = UpdateOutput(s)
	return DumpState(s)
}
func (a *App) OpenResourceSetting(state string, resource int, setting string) string {
	// fmt.Println("OpenResourceSetting")
	s := LoadState(state)
	for i, r := range s.Service.Resources {
		if r.Index == resource {
			s.Resource = s.Service.Resources[i]
			for j, _s := range r.Settings {
				if _s.Title == setting {
					s.Setting = s.Service.Resources[i].Settings[j]
				}
			}
		}
	}
	s.ContextMenu = ""
	s.ContextMenuType = ""
	return DumpState(s)
}
func (a *App) ChangeResourceSetting(state string, resource int, setting string, value string) string {
	// fmt.Println("ChangeResourceSetting")
	s := LoadState(state)
	for i, r := range s.Service.Resources {
		if r.Index == resource {
			for j, _s := range r.Settings {
				if _s.Title == setting {
					s.Service.Resources[i].Settings[j].Value = value
				}
			}
		}
	}
	s = UpdateOutput(s)
	return DumpState(s)
}
func (a *App) CloseResourceSetting(state string) string {
	// fmt.Println("CloseResourceSetting")
	s := LoadState(state)
	s.Resource = ServiceResource{
		Title:     "",
		Subtitle:  "",
		IconPath:  "",
		IconColor: "",
		Expanded:  false,
		Settings:  []ServiceResourceSetting{},
	}
	s.Setting = ServiceResourceSetting{
		Title:   "",
		Type:    "",
		Value:   "",
		Options: []string{},
	}
	s = UpdateOutput(s)
	return DumpState(s)
}

func saveStatus(state State) {
	// fmt.Println("saveStatus")
	for _, service := range state.Services {
		content, err := json.Marshal(service.Status)
		if err != nil {
			panic(err)
		}
		WriteFile(GetHome()+"/"+state.Folder+"/.babble/"+service.Title+"/status.json", string(content))
	}
}

func (a *App) LoadStatus(state string) string {
	// // fmt.Println("LoadStatus")
	s := LoadState(state)
	path := GetHome() + "/" + s.Folder + "/.babble"

	if PathExists(path) {
		folders := GetFolders(path)
		for _, subfolder := range folders {
			if PathExists(path + "/" + subfolder + "/status.json") {
				raw_status := ReadFile(path + "/" + subfolder + "/status.json")
				var status ServiceStatus
				err := json.Unmarshal([]byte(raw_status), &status)
				if err != nil {
					panic(err)
				}
				if s.Service.Title == subfolder {
					s.Service.Status = status
					s.Service.Subtitle = status.Status
				}
				for i, service := range s.Services {
					if service.Title == subfolder {
						s.Services[i].Status = status
						s.Services[i].Subtitle = status.Status
					}
				}
			}
		}
	}

	// removing services that no longer exist
	for i, service := range s.Services {
		if !PathExists(path + "/" + service.Title) {
			s.Services = append(s.Services[:i], s.Services[i+1:]...)
			if s.Service.Title == service.Title {
				s.Service = Service{
					File:          "",
					Title:         "",
					Subtitle:      "",
					IconPath:      "",
					IconColor:     "",
					ConfigSaved:   "",
					ConfigCurrent: "",
					Status: ServiceStatus{
						Status:  "",
						Message: "",
						Url:     "",
					},
					Resources: []ServiceResource{},
				}
			}
		}
	}
	return DumpState(s)
}
func (a *App) SaveFiles(state string) string {
	s := LoadState(state)
	for i, service := range s.Services {
		// if service.ConfigCurrent != service.ConfigSaved {
		WriteFile(GetHome()+"/"+s.Folder+"/.babble/"+service.Title+"/config.yaml", service.ConfigCurrent)
		s.Services[i].ConfigSaved = service.ConfigCurrent
		// break
		// }
	}
	return DumpState(s)
}

func (a *App) OpenDropdown(state string, resource int, setting string) string {
	// fmt.Println("OpenDropdown")

	s := LoadState(state)

	s.ContextMenuType = "dropdown"
	s.ContextMenu = fmt.Sprintf("%v", resource) + ":" + setting

	s.ContextMenuOptions = []string{}
	for _, preset_resource := range s.Presets.Resources {
		for _, preset_setting := range preset_resource.Settings {
			if preset_setting.Title == setting {
				s.ContextMenuOptions = preset_setting.Options
			}
		}
	}

	return DumpState(s)
}

func (a *App) CloseDropdown(state string) string {
	// fmt.Println("CloseDropdown")

	s := LoadState(state)

	s.ContextMenuType = ""
	s.ContextMenu = ""
	// s.ContextMenuOptions = []string{}

	return DumpState(s)
}

func (a *App) HandleDropdown(state string, option string) string {
	// fmt.Println("HandleDropdown")

	s := LoadState(state)

	resource := strings.Split(s.ContextMenu, ":")[0]
	setting := strings.Split(s.ContextMenu, ":")[1]

	s.ContextMenuType = ""
	s.ContextMenu = ""
	s.ContextMenuOptions = []string{}

	for i, r := range s.Service.Resources {
		if fmt.Sprintf("%v", r.Index) == resource {
			for j, _s := range r.Settings {
				if _s.Title == setting {
					s.Service.Resources[i].Settings[j].Value = option
				}
			}
		}
	}

	s = UpdateOutput(s)

	return DumpState(s)
}

func (a *App) OpenSettings(state string) string {
	s := LoadState(state)
	s.Dialog = "settings"
	return DumpState(s)
}

func (a *App) OpenDropdownTheme(state string) string {
	// fmt.Println("OpenDropdownTheme")
	s := LoadState(state)
	s.ContextMenuType = "dropdownTheme"
	s.ContextMenuOptions = []string{"light", "dark"}
	return DumpState(s)
}
func (a *App) HandleDropdownTheme(state string, option string) string {
	// fmt.Println("HandleDropdownTheme " + option)
	s := LoadState(state)
	s.ContextMenuType = ""
	s.Theme = option
	return DumpState(s)
}
func (a *App) OpenDropdownSize(state string) string {
	// fmt.Println("OpenDropdownSize")
	s := LoadState(state)
	s.ContextMenuType = "dropdownSize"
	s.ContextMenuOptions = []string{"small", "medium", "large", "x-large"}
	return DumpState(s)
}
func (a *App) HandleDropdownSize(state string, option string) string {
	// fmt.Println("HandleDropdownSize " + option)
	s := LoadState(state)
	s.ContextMenuType = ""
	s.Size = option
	if option == "small" {
		s.Font = 14
	} else if option == "medium" {
		s.Font = 16
	} else if option == "large" {
		s.Font = 18
	} else if option == "x-large" {
		s.Font = 20
	}
	return DumpState(s)
}

// func ViewErrorLogs(state string) string {
// 	// fmt.Println("ViewErrorLogs")
// 	s := LoadState(state)
// 	s.Error = true
// 	return DumpState(s)
// }
// func (a *App) CloseErrorLogs(state string) string {
// 	// fmt.Println("CloseErrorLogs")
// 	s := LoadState(state)
// 	s.Error = false
// 	return DumpState(s)
// }
