package main

import (
	"io/ioutil"
	"os"
	"strings"
)

func GetHome() string {
	home, err := os.UserHomeDir()
	if err != nil {
		panic(err)
	}
	return home
}
func GetFolders(path string) []string {
	path = strings.ReplaceAll(path, "//", "/")
	content, err := ioutil.ReadDir(path)
	if err != nil {
		return []string{}
	}
	folders := []string{}
	for _, f := range content {
		if f.IsDir() {
			folders = append(folders, f.Name())
		}
	}
	return folders
}
func GetFiles(path string) []string {
	path = strings.ReplaceAll(path, "//", "/")
	content, err := ioutil.ReadDir(path)
	if err != nil {
		return []string{}
	}
	folders := []string{}
	for _, f := range content {
		if !f.IsDir() {
			folders = append(folders, f.Name())
		}
	}
	return folders
}
func ReadFile(path string) string {
	path = strings.ReplaceAll(path, "//", "/")
	data, err := os.ReadFile(path)
	if err != nil {
		panic(err)
	}
	return string(data)
}
func WriteFile(path string, content string) {
	// fmt.Println("WriteFile " + path)
	path = strings.ReplaceAll(path, "//", "/")
	err := os.WriteFile(path, []byte(content), 0644)
	if err != nil {
		panic(err)
	}
}
func RemoveFile(path string) {
	path = strings.ReplaceAll(path, "//", "/")
	err := os.Remove(path)
	if err != nil {
		panic(err)
	}
}
func AddFolder(path string) {
	// fmt.Println("AddFolder " + path)
	path = strings.ReplaceAll(path, "//", "/")
	os.Mkdir(path, 0755)
}
func RemoveFolder(path string) {
	path = strings.ReplaceAll(path, "//", "/")
	err := os.RemoveAll(path)
	if err != nil {
		panic(err)
	}
}
func PathExists(path string) bool {
	path = strings.ReplaceAll(path, "//", "/")
	_, err := os.Stat(path)
	if err != nil {
		return false
	}
	return true
}

// func LoadFiles(dir string, files map[string]any) error {
// 	for key, value := range files {
// 		if value.(map[string]any)["type"] == "file" {
// 			err := ioutil.WriteFile(dir+"/"+key, []byte(value.(map[string]any)["content"].(string)), 0644)
// 			if err != nil {
// 				panic(err)
// 			}
// 		} else if value.(map[string]any)["type"] == "folder" {
// 			os.Mkdir(dir+"/"+key, 0755)
// 			err := LoadFiles(dir+"/"+key, value.(map[string]any)["content"].(map[string]any))
// 			if err != nil {
// 				panic(err)
// 			}
// 		}
// 	}
// 	return nil
// }

func LoadFiles(path string, dir string, files map[string]FileConfig) {
	// fmt.Println("LoadFiles " + path + " " + dir)
	if !PathExists(path + "/" + dir) {
		AddFolder(path + "/" + dir)
	}
	for k, v := range files {
		if v.Type == "file" {
			WriteFile(path+"/"+dir+"/"+k, v.Content)
		} else if v.Type == "folder" {
			LoadFiles(path+"/"+dir, k, v.Children)
		}
	}
}
