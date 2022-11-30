# {{ cookiecutter.repo_name }}

{{ cookiecutter.repo_description }}

## Repo Structure

```sh
.
├── .github 
│   └── workflows   # Contains Github Worklows
├── .devcontainer   # Devcontainer config - single devcontainer for entire repo
├── apps            # Contains apps deployed to fly.io - should only contain directories
│   └── <component> # Component directory - should contain at least fly.toml and Dockerfile
├── docs            # Central docs for entire repo
├── infrastructure  # Terraform config for entire repo
└── scripts         # Helpful utilities and scripts for maintaining projects and repo
```

## Contributing

This repo is structured as a monorepo: each directory in the `apps` directory of this repo should map to a component of Promptu and should be as self contained as possible. Each directory should be deployed as its own service.

As such, each component will have its own contributing guide, so to contribute, please first decide which component you need to contribute to, and navigate to that component's directory.
