.PHONY: help install run stop test

.DEFAULT_GOAL := help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

api-install: ## Run composer install within the host
	docker-compose run --rm \
		api npm install

install:
	$(MAKE) api-install

start: ## Start the server
	docker-compose up -d

stop: ## Stop the server
	docker-compose down

test-api:
	docker-compose run --rm \
		api npm run test

test: ## Test the go code and php code
	$(MAKE) test-api
