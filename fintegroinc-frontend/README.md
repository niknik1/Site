### What is include? ###

* Node
* Webpack + dev-server
* CSS 3
* SCSS
* ES-2015
* Twitter Bootstrap 4
* Font Awesome icons

### Testing and pre-compile checking ###

* Sass-linter
* JS-hinter
* Scss-linter
* JS Style Standart
* Mocha, Chai (In progress)

### How to install? ###

* [Install Node](https://nodejs.org/uk/download/package-manager/)
* [Install SCSS](http://sass-lang.com/install)
* Execute terminal command: 'npm install'

### How to use? ###
* Configure Bootstrap 4: you will must modify .bootstraprc and _bootstrap_variables.scss | [Docs](https://github.com/shakacode/bootstrap-loader)
* Configure SCSS Linter: you will must modify .stylelintrc and .stylelintignore | [Docs](https://github.com/JaKXz/stylelint-webpack-plugin)
* Configure JS Hinter: you will must modify loader options in webpack.config.js section .js / .es6 | [Docs](https://github.com/webpack-contrib/jshint-loader)
* Documentation for JS Standart | [Docs](https://standardjs.com/)

### Test for JS validation and standart ###

$ npm test

### Build (dev) ###

$ npm run start

### Build (production) ###

$ npm run build

### Running in production mode (with dev server in 3000 port) ###

$ npm run prod

### Running in dev mode (with dev server in 3000 port) ###

$ npm run dev

### OPTIONS ###

If in result of 'npm install' you see somethink like this:
*$ npm WARN prefer global colorguard@1.2.0 should be installed with -g
you must install package (in example: colorguard) globaly:
*$ sudo npm install -g colorguard