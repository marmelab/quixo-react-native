.PHONY: help install start stop test

.DEFAULT_GOAL := help

export NODE_ENV ?= development

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

api-install:
	cp -n api/.$(NODE_ENV).env.dist api/.env
	docker-compose run --rm \
		api npm install

app-install:
	cd quixo-react-native && npm i

install:
	$(MAKE) api-install
	$(MAKE) app-install

app-start:
	cd quixo-react-native && npm run start

start: ## Start the server + run the app
	docker-compose up -d
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

server-start-production:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

deploy:
	git archive -o quixo.zip HEAD
	scp -i $(key) quixo.zip $(ssh):~/quixo-api.zip
	ssh -i $(key) $(ssh) ' \
		unzip -uo ~/quixo-api.zip -d ~/quixo-api; \
		rm -f quixo-api.zip; \
		cd ~/quixo-api; \
		NODE_ENV=PRODUCTION make api-install && make server-start-production; \
	'
	rm -f quixo.zip
