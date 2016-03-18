## create webpack.config.js file

<!-- var webpack = require('webpack'),
       path = require('path');

module.exports = {
    context: __dirname + '/app',
    entry: { // the first file webpack will load
        app: './app.js',
        vendor: ['angular']
    },
    output: { // where bundle will go when webpack done
        path: __dirname + '/public/scripts',
        filename: 'todo.bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
    ]
}; -->

* npm install -g webpack
* npm install webpack --save-dev-exact
* install angular - npm install angular --save-dev-exact
* move app.js file from scripts folder into app folder and run webpack in terminal => webpack
* look in public/scripts folder and you will see webpack created todo.bundle.js and vendor.bundle.js

### in app.js
* add require statements

- var angular = require('angular');

- require('./scripts/controllers/main.js');
* run webpack in terminal

### in app/scripts/controllers/main.js
* require angular
- var angular = require('angular');
* run webpack

### At the top of all of your Angular files ( /controllers/main.js , /controllers/todo.js , /directives/todo.js, /services/data.js ) below the 'use strict' statement : You need to add the following.

* var angular = require('angular');
### Once those have been updated, your app.js file should look like this.
```
'use strict';

var angular = require('angular');

angular.module('todoListApp', []);

require('./scripts/controllers/main.js');
require('./scripts/controllers/todo.js');
require('./scripts/directives/todo.js');
require('./scripts/services/data.js');
```
