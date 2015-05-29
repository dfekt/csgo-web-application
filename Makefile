PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash

initjs:
	npm install

clean:
	find . -name "*.pyc" -exec rm -rf {} \;
	rm -rf *.egg-info

test:
	echo "test"

run:
	node ./bin/www

build.css: 
	lessc frontend/less/core.less public/stylesheets/bundle.css
	autoprefixer publicstylesheets/bundle.css

build.js:
	browserify frontend/js/app.js -o public/javascripts/bundle.js

build: build.js build.css

watch.css: 
	nodemon -I -w frontend/less/ --ext less --exec 'npm run build:css'

watch.js:
	watchify frontend/js/app.js -o public/javascripts/bundle.js -v

watch: watch.css watch.js

jshint:
	jshint --reporter node_modules/jshint-stylish/stylish.js frontend/js/; true

all: initjs build run
