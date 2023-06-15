build:
	-mkdir terraform
	GOPATH=${CURDIR}/terraform go install github.com/hashicorp/terraform@v1.3.9
	-mv terraform/bin/terraform terraform
	-mv terraform/bin/terraform.exe terraform
	npm install
	wails build