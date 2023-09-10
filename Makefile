.PHONY: template

TEMPLATE_NAME = _rename-me

template:
	@cp -r ./.base ./templates/$(TEMPLATE_NAME)

