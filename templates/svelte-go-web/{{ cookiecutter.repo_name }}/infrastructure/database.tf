locals {
  {{ cookiecutter.repo_name }}_mongodb_name = "{{ cookiecutter.repo_name }}-db"
}

resource "mongodbatlas_cluster" "{{ cookiecutter.repo_name }}-db" {
  project_id    = var.{{ cookiecutter.repo_name }}_mongo_db_project_id

  name          = local.{{ cookiecutter.repo_name }}_mongodb_name

  provider_name               = "TENANT"
  backing_provider_name       = "AWS"
  provider_instance_size_name = "M0" # free tier DB

  provider_region_name = "EU_WEST_1"
}

resource "mongodbatlas_database_user" "{{ cookiecutter.repo_name }}" {
  project_id    = var.{{ cookiecutter.repo_name }}_mongo_db_project_id

  username = "{{ cookiecutter.repo_name }}"
  password = "thispasswordisnotreal" # can be changed without affecting the resource

  auth_database_name = "admin"

  roles {
   role_name     = "readWrite"
   database_name = local.{{ cookiecutter.repo_name }}_mongodb_name
  }

  scopes {
    name = local.{{ cookiecutter.repo_name }}_mongodb_name
    type = "CLUSTER"
  }
}

resource "mongodbatlas_project_ip_access_list" "{{ cookiecutter.repo_name }}-api" {
  project_id    = var.{{ cookiecutter.repo_name }}_mongo_db_project_id

  ip_address = "137.66.12.143" # Update with fly.io app IP range
  comment    = "IP address for fly.io app ${fly_app.{{ cookiecutter.repo_name }}-api.id}"
}