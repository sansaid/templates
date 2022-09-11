# List of cookiecutter templates

This directory contains a list of cookiecutter templates I use for my personal projects.

Creation of projects should happen using the Makefile to ensure consistency.

## TODO

- [ ] Split each directory out into its own repo so we can use cookiecutter natively
    - [ ] If doing this, add a .devcontainer in the root of the cookiecutter repo so that it's easy to modify the cookiecutter
- [ ] Create a Github template for a cookiecutter template (so that it generates the hooks and variable defaults)
- [x] Create a [post-generate hook](https://cookiecutter.readthedocs.io/en/stable/advanced/hooks.html) that git initialises the repo, creates a repo in Github and initialises the code there 
- [ ] Maybe create a cookiecutter binary in Golang?
- [ ] Create a cli-tool cookiecutter: for creating CLI tooling
- [ ] Create a workflow-builder cookiecutter: builds Docker that can be used in the workflow for each type of service and publishes it to Docker - see [Docker workflow action](https://github.com/marketplace/actions/build-and-push-docker-images)