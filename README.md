# List of cookiecutter templates

This directory contains a list of cookiecutter templates I use for my personal projects.

To create a new template, use `make TEMPLATE_NAME=<template name> template` in the root of this directory.

Use the folders in the `templates` directories as normal cookiecutters.

To create a project from a cookiecutter, call the following from the location where you want to create your project ([latest instructions here](https://cookiecutter.readthedocs.io/en/stable/advanced/directories.html#organizing-cookiecutters-in-directories)):

```
cookiecutter https://github.com/sansaid/templates.git --directory="templates/<name of template>"
```
