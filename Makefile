.PHONY: workflow-builder web cli-tool

workflow-builder:
	@cookiecutter -o ./.projects ./workflow-builder

web:
	@cookiecutter -o ./.projects ./web

cli-tool:
	@cookiecutter -o ./.projects ./cli-tool