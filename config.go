package main

import "gopkg.in/yaml.v2"

func ConfigIsValid(config string) bool {

	var c map[string]ServiceConfig
	err := yaml.Unmarshal([]byte(config), &c)
	if err != nil {
		return false
	}
	return true

	// preset_resources := GetPresetResources()
	// for name, resource := range c {
	// 	if resource.Resource == ""
	// }

	// for _, name := range config_order {
	// 	item := c[name]
	// 	var resource_preset PresetResource
	// 	var resource_preset_match bool
	// 	resource_preset_match = false
	// 	for _, r := range preset_resources {
	// 		if r.Title == item.Resource {
	// 			resource_preset = r
	// 			resource_preset_match = true
	// 			break
	// 		}
	// 	}
	// 	if !resource_preset_match {
	// 		return false
	// 	}

	// 	var resource ServiceResource
	// 	if resource_preset_match {
	// 		resource_settings := []ServiceResourceSetting{}
	// 		for _, setting := range resource_preset.Settings {
	// 			resource_settings = append(resource_settings, ServiceResourceSetting{
	// 				Title:   setting.Title,
	// 				Type:    setting.Type,
	// 				Value:   item.Settings[setting.Title].(string),
	// 				Options: setting.Options,
	// 			})
	// 		}
	// 		resource = ServiceResource{
	// 			Index:     index,
	// 			Title:     name,
	// 			Subtitle:  item.Resource,
	// 			IconPath:  resource_preset.IconPath,
	// 			IconColor: resource_preset.IconColor,
	// 			Expanded:  false,
	// 			Settings:  resource_settings,
	// 		}
	// 		index++
	// 	} else {
	// 		resource = ServiceResource{
	// 			Index:     index,
	// 			Title:     name,
	// 			Subtitle:  item.Resource,
	// 			IconPath:  "",
	// 			IconColor: "",
	// 			Expanded:  false,
	// 			Settings:  []ServiceResourceSetting{},
	// 		}
	// 		index++
	// 	}
	// 	resources = append(resources, resource)
	// }
	// return true
}
