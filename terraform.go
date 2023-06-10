package main

import (
	"bytes"
	_ "embed"
	"io/ioutil"
	"os"
	"os/exec"
	"strings"
)

//go:embed terraform
var terraform_binary []byte

var tf string

func OpenTerraform() error {
	path, err := ioutil.TempDir("", "terraform")
	if err != nil {
		return err
	}
	err = os.WriteFile(path+"/terraform", terraform_binary, 0644)
	if err != nil {
		return err
	}
	err = os.Chmod(path+"/terraform", 0755)
	if err != nil {
		return err
	}
	tf = path + "/terraform"
	return nil
}
func CloseTerraform() error {
	err := os.Remove(tf)
	if err != nil {
		return err
	}
	path_split := strings.Split(tf, "/")
	parent := "/" + strings.Join(path_split[:len(path_split)-1], "/")
	return os.RemoveAll(parent)
}

func ExecuteCommand(dir string, args []string, env map[string]string) (int, string) {
	// fmt.Println("ExecuteCommand " + dir + " " + strings.Join(args, " "))
	cmd := exec.Command(args[0], args[1:]...)
	// fmt.Println(args[1:])
	cmd.Dir = dir
	cmd.Env = os.Environ()
	for key, value := range env {
		cmd.Env = append(cmd.Env, key+"="+value)
	}
	var stdout, stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr
	exitCode := 0
	commandOutput := ""
	err := cmd.Start()
	if err != nil {
		panic(err)
	}
	err = cmd.Wait()
	if err != nil {
		if exitErr, ok := err.(*exec.ExitError); ok {
			if status, ok := exitErr.Sys().(interface{ ExitStatus() int }); ok {
				exitCode = status.ExitStatus()
			} else {
				exitCode = 1
			}
		} else {
			exitCode = 1
			commandOutput = "failure"
			// fmt.Println(err.Error())
		}
	}
	if exitCode != 0 {
		if commandOutput != "failure" {
			commandOutput = stdout.String() + stderr.String()
		}
	} else {
		commandOutput = stdout.String() + stderr.String()
	}
	return exitCode, commandOutput
}
func TerraformInit(dir string, env map[string]string) (int, string) {
	// fmt.Println("TerraformInit " + dir)
	return ExecuteCommand(dir, []string{tf, "init"}, env)
}
func TerraformApply(dir string, env map[string]string) (int, string) {
	// fmt.Println("TerraformApply " + dir)
	return ExecuteCommand(dir, []string{tf, "apply", "-auto-approve"}, env)
}
func TerraformDestroy(dir string, env map[string]string) (int, string) {
	// fmt.Println("TerraformDestroy " + dir)
	return ExecuteCommand(dir, []string{tf, "destroy", "-auto-approve"}, env)
}

// func main() {

// 	tf, err := OpenTerraform()
// 	if err != nil {
// 		panic(err)
// 	}
// 	defer CloseTerraform(tf)

// 	code, output := TerraformInit(tf, "/app", map[string]string{})
// 	// fmt.Println(code)
// 	// fmt.Println(output)

// }

// package main

// import (
// 	"bytes"
// 	"fmt"
// 	"os"
// 	"os/exec"
// )

// type TerraformResult struct {
// 	Code   int
// 	Output string
// }

// func TerraformInit(dir string, env map[string]string) (int, string) {
// 	cmd := exec.Command("terraform", "-chdir="+dir, "init")
// 	cmd.Env = os.Environ()
// 	for key, value := range env {
// 		cmd.Env = append(cmd.Env, key+"="+value)
// 	}
// 	var stdout, stderr bytes.Buffer
// 	cmd.Stdout = &stdout
// 	cmd.Stderr = &stderr
// 	exitCode := 0
// 	commandOutput := ""
// 	err := cmd.Start()
// 	if err != nil {
// 		panic(err)
// 	}
// 	err = cmd.Wait()
// 	if err != nil {
// 		if exitErr, ok := err.(*exec.ExitError); ok {
// 			if status, ok := exitErr.Sys().(interface{ ExitStatus() int }); ok {
// 				exitCode = status.ExitStatus()
// 			} else {
// 				exitCode = 1
// 			}
// 		} else {
// 			exitCode = 1
// 			commandOutput = "failure"
// 			// fmt.Println(err.Error())
// 		}
// 	}
// 	if exitCode != 0 {
// 		if commandOutput != "failure" {
// 			commandOutput = stdout.String() + stderr.String()
// 		}
// 	} else {
// 		commandOutput = stdout.String() + stderr.String()
// 	}
// 	return exitCode, commandOutput
// }
// func TerraformApply(dir string, env map[string]string) (int, string) {
// 	cmd := exec.Command("terraform", "-chdir="+dir, "apply", "-auto-approve")
// 	cmd.Env = os.Environ()
// 	for key, value := range env {
// 		cmd.Env = append(cmd.Env, key+"="+value)
// 	}
// 	var stdout, stderr bytes.Buffer
// 	cmd.Stdout = &stdout
// 	cmd.Stderr = &stderr
// 	exitCode := 0
// 	commandOutput := ""
// 	err := cmd.Start()
// 	if err != nil {
// 		panic(err)
// 	}
// 	err = cmd.Wait()
// 	if err != nil {
// 		if exitErr, ok := err.(*exec.ExitError); ok {
// 			if status, ok := exitErr.Sys().(interface{ ExitStatus() int }); ok {
// 				exitCode = status.ExitStatus()
// 			} else {
// 				exitCode = 1
// 			}
// 		} else {
// 			exitCode = 1
// 			commandOutput = "failure"
// 			// fmt.Println(err.Error())
// 		}
// 	}
// 	if exitCode != 0 {
// 		if commandOutput != "failure" {
// 			commandOutput = stdout.String() + stderr.String()
// 		}
// 	} else {
// 		commandOutput = stdout.String() + stderr.String()
// 	}
// 	return exitCode, commandOutput
// }
// func TerraformDestroy(dir string, env map[string]string) (int, string) {
// 	cmd := exec.Command("terraform", "-chdir="+dir, "destroy", "-auto-approve")
// 	cmd.Env = os.Environ()
// 	for key, value := range env {
// 		cmd.Env = append(cmd.Env, key+"="+value)
// 	}
// 	var stdout, stderr bytes.Buffer
// 	cmd.Stdout = &stdout
// 	cmd.Stderr = &stderr
// 	exitCode := 0
// 	commandOutput := ""
// 	err := cmd.Start()
// 	if err != nil {
// 		panic(err)
// 	}
// 	err = cmd.Wait()
// 	if err != nil {
// 		if exitErr, ok := err.(*exec.ExitError); ok {
// 			if status, ok := exitErr.Sys().(interface{ ExitStatus() int }); ok {
// 				exitCode = status.ExitStatus()
// 			} else {
// 				exitCode = 1
// 			}
// 		} else {
// 			exitCode = 1
// 			commandOutput = "failure"
// 			// fmt.Println(err.Error())
// 		}
// 	}
// 	if exitCode != 0 {
// 		if commandOutput != "failure" {
// 			commandOutput = stdout.String() + stderr.String()
// 		}
// 	} else {
// 		commandOutput = stdout.String() + stderr.String()
// 	}
// 	return exitCode, commandOutput
// }
