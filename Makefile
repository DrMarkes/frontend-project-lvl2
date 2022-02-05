install:
	npm ci
	npx simple-git-hooks

gendiff:
	node bin/gendiff.js

test:
	npm test

test-watch:
	npm test -- --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test