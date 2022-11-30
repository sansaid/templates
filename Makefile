.PHONY: template

TEMPLATE_NAME = _rename-me

template:
	@cp -r ./.meta-template ./templates/$(TEMPLATE_NAME)

