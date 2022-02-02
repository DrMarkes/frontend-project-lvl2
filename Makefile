install:
	npm ci

gendiff:
	node bin/gendiff.js

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test