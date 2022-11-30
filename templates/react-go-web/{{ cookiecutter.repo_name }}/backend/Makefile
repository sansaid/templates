.PHONY: gen-api lint run

# To lint the OpenAPI spec file
lint:
	@spectral lint ./gen/api.yaml -r ./gen/.spectral.yaml

# If there's a change in the OpenAPI spec file, run this target to lint the spec and regenerate it
# You'll need to make sure you've updated the implementations in ./api/api.go
gen-api: lint
	@go generate ./gen/generate.go

# To build backboi only
build:
	@mkdir build
	@go build -o ./build ./...

# To build and run {{ cookiecutter.repo_name }} for local testing
run: build
	@./build/{{ cookiecutter.repo_name }}
