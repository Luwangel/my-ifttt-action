default: help

help: ## SOS? Usage: `make help` (default).
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | gawk 'match($$0, /(makefile:)?(.*):.*?## (.*)/, a) {printf "\033[36m%-30s\033[0m %s\n", a[2], a[3]}'

install: ## Install all dependencies. Usage: `make install`.
	npm install

release: ## Publish a release. Usage: `make release`.
	rm -rf node_modules
	sed -i '/node_modules/d' .gitignore
	npm install --production
	git add node_modules .gitignore
	git commit -m "Publish Release"
