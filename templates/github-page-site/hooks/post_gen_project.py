import os
import subprocess

sub_env = os.environ.copy() 

{% if cookiecutter.init_commit == "yes" %}
subprocess.run(['git', 'init'])
subprocess.run(['git', 'branch', '-m', 'main'])
subprocess.run(['git', 'add', '.'])
subprocess.run(['git', 'commit', '-m', 'Initial commit - auto generated from cookiecutter'])
{% endif %}

{% if cookiecutter.create_gh_repo == "yes" %}
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