DC = docker-compose
DEVFLAGS = -f docker-compose.dev.yml
PRODFLAGS = -f docker-compose.yml -f docker-compose.override.yml
HARDBUILDFLAGS = --build --force-recreate
VOLUMEFLAG = -V
SSOSERVICES = local.sso.keycloak local.sso.postgres sc.appli.front
SSOTESTSERVICES = local.sso.keycloak local.sso.postgres sc.appli.test

all: clean build up ## (Default)

build: ## Build all images
	$(DC) $(DEVFLAGS) $(PRODFLAGS) build


up: ## Run all images
	$(DC) $(DEVFLAGS) $(PRODFLAGS) up $(VOLUMEFLAG) 


clean: ## Clean all
	$(DC) $(DEVFLAGS) $(PRODFLAGS) down -v --rmi local


ssof: clean_sso build_sso up_sso  ## Minimal SSO Launch

build_sso: ## Build SSO minimal
	$(DC) $(DEVFLAGS) $(PRODFLAGS) build $(SSOSERVICES)


up_sso: ## Run SSO minimal
	$(DC) $(DEVFLAGS) $(PRODFLAGS) up $(VOLUMEFLAG) $(SSOSERVICES)


clean_sso: ## Clean SSO minimal
	$(DC) $(DEVFLAGS) $(PRODFLAGS) down -v --rmi local


ssot: clean_sso_test build_sso_test up_sso_test ## Minimal SSO Test Launch

build_sso_test: ## Build SSO_test minimal
	$(DC) $(DEVFLAGS) $(PRODFLAGS) build $(SSOTESTSERVICES)


up_sso_test: ## Run SSO_test minimal
	$(DC) $(DEVFLAGS) $(PRODFLAGS) up $(VOLUMEFLAG) $(SSOTESTSERVICES)


clean_sso_test: ## Clean SSO_test minimal
	$(DC) $(DEVFLAGS) $(PRODFLAGS) down -v --rmi local


exec: $(TEST) ## Exec prefix (shell inside a running container)
	$(TEST)


ssoedf: ## AppliFront Dev
	$(DC) $(DEVFLAGS) $(PRODFLAGS) exec --it sc.appli.front -- /bin/bash

ssoef: ## AppliFront Prod
	$(DC) $(PRODFLAGS) exec --it sc.appli.front -- /bin/bash

	
ssoedt: ## AppliTest Dev
	$(DC) $(DEVFLAGS) $(PRODFLAGS) exec --it sc.appli.test -- /bin/bash

ssoet: ## AppliTest Prod
	$(DC) $(PRODFLAGS) exec --it sc.appli.test -- /bin/bash


.PHONY: help

help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'