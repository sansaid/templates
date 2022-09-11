import os
import subprocess

CURR_DIR = os.getcwd()
PROJECT_DIR = os.path.abspath(f"{CURR_DIR}/../../.projects/{{ cookiecutter.repo_name }}")

sub_env = {
    "GH_TOKEN": os.environ.get("GH_TOKEN", "doesnotexist")
}

os.chdir(PROJECT_DIR)

subprocess.run(['git', '-C', '{{ cookiecutter.repo_name }}', 'init'])

subprocess.run([
    'gh', 'repo', 'create', 
    '--source', '.',
    '--private'], 
    env=sub_env)