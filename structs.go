package main

type State struct {
	Page               string                 `json:"page"`
	Workspace          string                 `json:"workspace"`
	Folder             string                 `json:"folder"`
	Files              []string               `json:"files"`
	Subfolders         []string               `json:"subfolders"`
	Services           []Service              `json:"services"`
	Service            Service                `json:"service"`
	Resource           ServiceResource        `json:"resource"`
	Setting            ServiceResourceSetting `json:"setting"`
	Dialog             string                 `json:"dialog"`
	ContextMenuType    string                 `json:"contextMenuType"`
	ContextMenu        string                 `json:"contextMenu"`
	ContextMenuOptions []string               `json:"contextMenuOptions"`
	ContextMenuX       int                    `json:"contextMenuX"`
	ContextMenuY       int                    `json:"contextMenuY"`
	Presets            Preset                 `json:"presets"`
	Action             string                 `json:"action"`
	Provider           string                 `json:"provider"`
	Navigation         Navigation             `json:"navigation"`
	Size               string                 `json:"size"`
	Font               int                    `json:"font"`
	Theme              string                 `json:"theme"`
	Error              bool                   `json:"error"`
}
type Service struct {
	File          string            `json:"file"`
	Title         string            `json:"title"`
	Subtitle      string            `json:"subtitle"`
	IconPath      string            `json:"iconPath"`
	IconColor     string            `json:"iconColor"`
	ConfigSaved   string            `json:"configSaved"`
	ConfigCurrent string            `json:"configCurrent"`
	Status        ServiceStatus     `json:"status"`
	Resources     []ServiceResource `json:"resources"`
}
type ServiceStatus struct {
	Status  string `json:"status"`
	Message string `json:"message"`
	Url     string `json:"url"`
}
type ServiceResource struct {
	Index     int                      `json:"index"`
	Title     string                   `json:"title"`
	Subtitle  string                   `json:"subtitle"`
	IconPath  string                   `json:"iconPath"`
	IconColor string                   `json:"iconColor"`
	Expanded  bool                     `json:"expanded"`
	Settings  []ServiceResourceSetting `json:"settings"`
}
type ServiceResourceSetting struct {
	Title   string   `json:"title"`
	Type    string   `json:"type"`
	Value   string   `json:"value"`
	Options []string `json:"options"`
}

type Preset struct {
	Resources []PresetResource `json:"resources"`
	Providers []PresetProvider `json:"providers"`
	Icons     []PresetIcon     `json:"icons"`
}
type PresetResource struct {
	Title     string                  `json:"title"`
	IconPath  string                  `json:"iconPath"`
	IconColor string                  `json:"iconColor"`
	Settings  []PresetResourceSetting `json:"settings"`
}
type PresetResourceSetting struct {
	Title   string   `json:"title"`
	Type    string   `json:"type"`
	Options []string `json:"options"`
}

type PresetProvider struct {
	Title       string                     `json:"title"`
	IconPath    string                     `json:"iconPath"`
	IconViewBox string                     `json:"iconViewBox"`
	IconColor   string                     `json:"iconColor"`
	Credentials []PresetProviderCredential `json:"credentials"`
}
type PresetProviderCredential struct {
	Label string `json:"label"`
	Type  string `json:"type"`
	Env   string `json:"env"`
	Value string `json:"value"`
}

type PresetIcon struct {
}
type ServiceConfig struct {
	Resource string         `yaml:"resource"`
	Settings map[string]any `yaml:"settings"`
}

type UpdateStatus struct {
}

type Navigation struct {
	Folder  string   `json:"folder"`
	Folders []string `json:"folders"`
	Files   []string `json:"files"`
}
