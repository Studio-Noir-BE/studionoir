.PHONY: craft

craft: ddev
	rm -rf config/license.key
	ddev exec php craft setup/app-id \
		$(filter-out $@,$(MAKECMDGOALS))
	ddev exec php craft setup/security-key \
		$(filter-out $@,$(MAKECMDGOALS))
	ddev exec php craft setup \
		$(filter-out $@,$(MAKECMDGOALS))
	ddev exec php craft up \
		$(filter-out $@,$(MAKECMDGOALS))
	ddev exec php craft project-config/apply \
		$(filter-out $@,$(MAKECMDGOALS))
	ddev launch
	rm -rf Makefile

ddev:
	cp .env.example .env
	ddev config
	ddev auth ssh; \
	ddev start; \
	ddev composer install; \
	ddev exec npm install; \
