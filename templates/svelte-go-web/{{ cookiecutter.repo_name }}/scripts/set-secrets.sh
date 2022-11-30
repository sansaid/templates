#/usr/bin/env bash

{{ cookiecutter.__caps_repo_name }}_DB_HOST='{{ cookiecutter.repo_name }}-db.az3ptb6.mongodb.net'

# Being lazy here and statically defining the path of the API code.
# This means we always have to run the script from where we found it.
# We can update this code later to make it runnable from anywhere.
cd ../apps/api

flyctl secrets set --detach {{ cookiecutter.__caps_repo_name }}_MONGODB_URL="mongodb+srv://${{{ cookiecutter.__caps_repo_name }}_DB_USERNAME}:${{{ cookiecutter.__caps_repo_name }}_DB_PASSWORD}@${{{ cookiecutter.__caps_repo_name }}_DB_HOST}"