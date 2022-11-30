resource "fly_app" "{{ cookiecutter.repo_name }}" {
  name = "{{ cookiecutter.repo_name }}"
  org = "{{ cookiecutter.repo_name }}"
}

resource "fly_app" "{{ cookiecutter.repo_name }}-api" {
  name = "{{ cookiecutter.repo_name }}-api"
  org = "{{ cookiecutter.repo_name }}"
}