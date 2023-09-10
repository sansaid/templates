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
subprocess.run(['git', 'init'], check=True)
subprocess.run(['git', 'branch', '-m', 'main'], check=True)
subprocess.run(['git', 'add', '.'], check=True)
subprocess.run(['git', 'commit', '-m', 'Initial commit - auto generated from cookiecutter'], check=True)
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
    env=sub_env,
    check=True)
{% endif %}