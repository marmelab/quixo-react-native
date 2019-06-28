.PHONY: help install start stop test

.DEFAULT_GOAL := help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

api-install:
	cp -n api/.env.dist api/.env
	docker-compose run --rm \
		api npm install

app-install:
	cd quixo-react-native && npm i

install:
	$(MAKE) api-install
	$(MAKE) app-install

api-start:
	docker-compose up -d

app-start:
	cd quixo-react-native && npm run start

start: ## Start the server + run the app
	$(MAKE) api-start
	$(MAKE) app-start

stop: ## Stop the server
	docker-compose down

logs:
	docker-compose logs -f

test-api:
	docker-compose run --rm \
		api npm run test

test-api-watch:
	docker-compose run --rm \
		api npm run test-watch

test-go:
	docker-compose run --rm \
		advisor go test -v tests

test:
	$(MAKE) test-api
	$(MAKE) test-go
