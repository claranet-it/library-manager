.DEFAULT_GOAL := help
.SILENT:

## Colors
COLOR_RESET   = \033[0m
COLOR_INFO    = \033[32m
COLOR_COMMENT = \033[33m

PLATFORM_ROOT=/srv
PLATFORM_RUNTIME_ROOT=${PLATFORM_ROOT}

PHP_CONTAINER=library-manager-php


## Help
help:
	printf "${COLOR_COMMENT}Usage:${COLOR_RESET}\n"
	printf " make [target]\n\n"
	printf "${COLOR_COMMENT}Available targets:${COLOR_RESET}\n"
	awk '/^[a-zA-Z\-\_0-9\.@]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf " ${COLOR_INFO}%-16s${COLOR_RESET} %s\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)


## Starts platform
up:
	docker-compose up -d

## Stop platform
stop:
	docker-compose stop

## Restart platform
restart:
	make stop && make up

## Build
build:
	docker-compose build ${PHP_CONTAINER} --no-cache
	sleep 10
	make up
	sleep 10
	make run-composer-install

test-all:
	@echo "${COLOR_INFO} 🔧️ Run php bin/phpunit ${COLOR_RESET}"
	docker exec -e XDEBUG_MODE=off ${PHP_CONTAINER} sh -c "php bin/phpunit --testdox"

test:
	@echo "${COLOR_INFO} 🔧️ Run php bin/phpunit ${COLOR_RESET}"
	docker exec -e XDEBUG_MODE=off ${PHP_CONTAINER} sh -c "php bin/phpunit --testdox --filter ${filter}"


## Install dependency
run-composer-install:
	@echo "${COLOR_INFO} 🔧️ Run composer install ${COLOR_RESET}"
	docker exec ${PHP_CONTAINER} sh -c "composer install -o"

## Login to php container
php-shell:
	@echo "Running ${COLOR_INFO}docker exec -it ${PHP_CONTAINER} /bin/bash${COLOR_RESET}"
	docker-compose exec -it -e XDEBUG_MODE=off ${PHP_CONTAINER} bash

## Migrations
migrate-diff:
	docker exec ${PHP_CONTAINER} sh -c "php bin/console doctrine:migrations:migrate"

## PHP cs fix check
php-cs-check:
	@echo "${COLOR_INFO} 🔎️ Run php-cs-fix with dry-run${COLOR_RESET}"
	docker exec -e XDEBUG_MODE=off ${PHP_CONTAINER} sh -c "php vendor/bin/php-cs-fixer fix --using-cache=no --dry-run --config .php-cs-fixer.dist.php -v"

## Run php cs fix
php-cs-fix:
	@echo "${COLOR_INFO} 🔎️ Run php-cs-fix${COLOR_RESET}"
	docker exec -e XDEBUG_MODE=off ${PHP_CONTAINER} sh -c "php vendor/bin/php-cs-fixer fix --using-cache=no --config .php-cs-fixer.dist.php -v"

## PHPStan
php-stan:
	@echo "${COLOR_INFO} 🔎️ Run PhpStan ${COLOR_RESET}"
	docker exec -e XDEBUG_MODE=off ${PHP_CONTAINER} sh -c "vendor/bin/phpstan analyse -c phpstan.neon"

import-books:
	@echo "${COLOR_INFO} 🔎️ Run import-books${COLOR_RESET}"
	docker exec ${PHP_CONTAINER} sh -c "php bin/console import-books ${filter}"