import os
import subprocess
import sys

{% if cookiecutter.add_initial_commit not in ["y", "n"] %}
sys.exit("add_initial_commit must be y or n")
{% endif %}

{% if cookiecutter.create_gh_repo not in ["y", "n"] %}
sys.exit("create_gh_repo must be y or n")
{% endif %}

sub_env = os.environ.copy() 

{% if cookiecutter.add_initial_commit == "y" %}
subprocess.run(['git', 'init'])
subprocess.run(['git', 'branch', '-m', 'main'])
subprocess.run(['git', 'add', '.'])
subprocess.run(['git', 'commit', '-m', 'Initial commit - auto generated from cookiecutter'])
{% endif %}

{% if cookiecutter.create_gh_repo == "y" %}
subprocess.run([
    'gh', 'repo', 'create', 
    '--source', '.',
    '--private',
    '--push',
    '--description',
    '{{ cookiecutter.repo_description }}'
    ], 
    env=sub_env)
{% endif %}