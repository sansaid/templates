import os
import subprocess

CURR_DIR = os.getcwd()
PROJECT_DIR = os.path.abspath(f"{CURR_DIR}/../../.projects/{{ cookiecutter.repo_name }}")

os.chdir(PROJECT_DIR)

sub_env = os.environ.copy() 

subprocess.run(['git', 'init'])

subprocess.run([
    'gh', 'repo', 'create', 
    '--source', '.',
    '--private'], 
    env=sub_env)