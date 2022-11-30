.PHONY: gen-api lint run

# To lint the OpenAPI spec file
lint:
	@spectral lint ./gen/api.yaml

# If there's a change in the OpenAPI spec file, run this target to lint the spec and regenerate it
# You'll need to make sure you've updated the implementations in ./api/api.go
gen-api: lint
	@oapi-codegen -package api ./gen/api.yaml -o ./api/api.gen.go -old-config-style

# To build backboi only
build:
	@mkdir build
	@go build -o ./build ./...

# To build and run backend for local testing
run: build
	@./build/backend
