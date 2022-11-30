# {{ cookiecutter.repo_name }} - backend

This is where the server logic for {{ cookiecutter.repo_name }} resides.

## Contributing

{{ cookiecutter.repo_name }} uses [`oapi-codegen`](https://github.com/deepmap/oapi-codegen) for its backend. To make changes to {{ cookiecutter.repo_name }}'s APIs, please make changes first to the OpenAPI spec in [`gen/api.yaml`](./gen/api.yaml) and regenerate the server code using `make gen-api` (see [Makefile](./Makefile) for more details). Some things to note when changing the spec:

* The `operationIds` of each method will determine the method name in Golang. It must be snake cased (i.e. `snake-cased`) and it will then be converted to UpperCamelCased (e.g. `snake-cased` operation ID will map to `SnakeCased` Golang method)

To make changes to the handler implementations, please modify [`gen/api.go`](./gen/api.go). You'll find the method to path mapping inside [`gen/api.gen.go`](./gen/api.gen.go).

To make changes to the Echo server configuration, please modify [`main.go`](./main.go).

## Running

All running commands and instructions can be found in the [Makefile](./Makefile). What the targets do should be described in the comment above it.

## TODO
_! = no dependencies, otherwise the order of the list determines when things should be executed from first to last_

- [ ] ! _None yet!_
