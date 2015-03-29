# boilerplate for node heroku apps

## Requires
Node, NPM, [nodemon](http://nodemon.io/), [Heroku Toolbelt](https://toolbelt.heroku.com/)/[Foreman](https://github.com/ddollar/foreman), [gulp](http://gulpjs.com/), and [bower](http://bower.io/)

## To install dependencies:
```
$ npm install && bower install
```
## To run locally:
```sh
$ nodemon
```
or with Heroku Toolbelt/Foreman:
```
$ foreman start dev
```
### and to compile assets (sass and browserify js)
```sh
$ gulp
```
##Deploying on Heroku
see the postinstall script in the package.json. [SASS](https://www.npmjs.com/package/node-sass) and [Browserify](http://browserify.org/) will compile front-end assets.
Bower will install [Modernizr](http://modernizr.com/) and [normalize.css](http://necolas.github.io/normalize.css/).