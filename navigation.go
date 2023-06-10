package main

import (
	"strings"
)

//	func (a *App) StartNavigating(state string) string {
//		s := LoadState(state)
//		return DumpState(s)
//	}

func UpdateNavigation(state State) State {
	// fmt.Println("UpdateNavigation")
	state.Navigation.Files = []string{}
	state.Navigation.Folders = []string{}
	path := GetHome() + "/" + state.Navigation.Folder
	files := GetFiles(path)
	folders := GetFolders(path)
	for _, file := range files {
		if file[0] != '.' {
			file_content := ReadFile(path + "/" + file)
			if ConfigIsValid(file_content) {
				state.Navigation.Files = append(state.Navigation.Files, file)
			}
		}
	}
	for _, folder := range folders {
		if folder[0] != '.' {
			state.Navigation.Folders = append(state.Navigation.Folders, folder)
		}
	}
	return state
}

func StartNavigating(state State) State {
	// fmt.Println("StartNavigating")
	state.Navigation.Folder = state.Folder
	state = UpdateNavigation(state)
	return state
}

func (a *App) NavigateParent(state string) string {
	// fmt.Println("NavigateParent")
	s := LoadState(state)

	s.Navigation.Folder = strings.Join(
		strings.Split(s.Navigation.Folder, "/")[0:len(strings.Split(s.Navigation.Folder, "/"))-1],
		"/",
	)
	s = UpdateNavigation(s)

	return DumpState(s)
}
func (a *App) NavigateChild(state string, name string) string {
	// fmt.Println("NavigateChild")
	s := LoadState(state)

	s.Navigation.Folder += "/" + name

	s = UpdateNavigation(s)

	return DumpState(s)
}
