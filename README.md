# List of cookiecutter templates

This directory contains a list of cookiecutter templates I use for my personal projects.

To create a new template, use `make template` in the root of this directory and rename the output directory.

Use the folders in the `templates` directories as normal cookiecutters.

## TODO

- [ ] Split each directory out into its own repo so we can use cookiecutter natively
    - [ ] If doing this, add a .devcontainer in the root of the cookiecutter repo so that it's easy to modify the cookiecutter
- [ ] Create a Github template for a cookiecutter template (so that it generates the hooks and variable defaults)
- [x] Create a [post-generate hook](https://cookiecutter.readthedocs.io/en/stable/advanced/hooks.html) that git initialises the repo, creates a repo in Github and initialises the code there 
- [ ] Maybe create a cookiecutter binary in Golang?
- [ ] Create a cli-tool cookiecutter: for creating CLI tooling
- [x] Create a workflow-builder cookiecutter: builds Docker that can be used in the workflow for each type of service and publishes it to Docker - see [Docker workflow action](https://github.com/marketplace/actions/build-and-push-docker-images)