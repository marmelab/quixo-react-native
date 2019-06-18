.PHONY: help install start stop test

.DEFAULT_GOAL := help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

api-install:
	docker-compose run --rm \
		api npm install

install:
	cp -n api/.env.dist api/.env
	$(MAKE) api-install

start: ## Start the server
	docker-compose up -d

stop: ## Stop the server
	docker-compose down

test-api:
	docker-compose run --rm \
		api npm run test

test:
	$(MAKE) test-api
