install:
	@if [ ! -f "$$(which nodemon)" ]; then npm --registry=http://registry.npm.taobao.org install nodemon -g; fi
	@npm --registry=http://registry.npm.taobao.org install

dev: install
	@rm -rf dist
	@eslint --fix src/**/*.js
	@nodemon entry.js

deploy:
	@babel src --out-dir dist
	@cp package.json dist && cp README.md dist

publish: deploy
	@cd dist && npm publish && cd ..
