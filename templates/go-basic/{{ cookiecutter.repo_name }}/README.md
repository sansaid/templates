# {{ cookiecutter.repo_name }}

{{ cookiecutter.repo_description }}

## Contributing

You can reliably setup a dev environment to run and contribute to this repo using the defined devconatiner. Simply clone this repo and run `devcontainer open .` within the root of this repo.

To run any tests, run the following command in the root of this repo - this will also install any required dependencies to run the tests:

```sh
make test
```