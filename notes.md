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
### mongoDB
  1. npm install --save -E mongoose
  2. mongod to start the db
  3. nodemon starts express
### connect our app to mongoDB
1. create database.js
 * create a connection to mongoDB with the URL and success/failure callback
 * be sure to require('./database') in app.js
2. setting up models - schema
 * create a models directory
 * create todo.js files
  - var mongoose = require('mongoose');
 * Schema = A way to define data stored in a DB
  - var todoSchema = new mongoose.Schema({
    name: String,
    completed: Boolean
  });
 * create a model
  - var model = mongoose.model('Todo', todoSchema);
 * export model
  - module.exports = model;
### debugging helper - Iron node
 * npm install iron-node -g
 * set up breakpoint in app.js
  - debugger:
* to run iron-node:
iron-node src/app.js
### using models in the app
1. var Todos = require('../models/todo'); in index.js
2. comment out mock data in index.js
3. GET todos using the find method
Todo.find({}, function(err, todos) {
  if(err){
    return console.log(err);
    }
    res.json({todos: todos});
  });
### creating seed data
1. load data - create src/seed.js
2. require('./seed'); in app.js
3. in seed.js
* var Todo = require('./models/todo');
* create an array of data
```var todos = [
  'go grocery shopping',
  'go to post office',
  'walk the dogs',
  'water plants'
];
```
* iterate over the array
```
todos.forEach(function (todo, index) {
  Todo.find({ 'name': todo }, function(err, todos) {
    // look for the todo that is equal to the string
    if (!err && !todos.length) {
      // if there is not an error and todo does not exist, then create it
      Todo.create({ completed: false, name: todo });
    };
  });
});
```
* To create a new record in the database
```
Todo.create({name: 'the todo'});
```
* launch Postman and try out the GET request  http://localhost:3000/api/todos
### creating and editing data in app
1. add body parser to app
* npm install body-parser --save
2. require body parser in app.js
```
var parser = require('body-parser');
```
3. use parser.json in app.js
```
app.use(parser.json());
```
#### to create and store todo in db
```
router.post('/todos', function(req, res){
  var todo = req.body; // body of the request will be the data for our todos

  //store todo in database
  Todo.create(todo, function(err, todo){
    if(err){
      return res.status(500).json({err: err.message});
    }
    res.send(todo);
    // need to add a body parser bc express does not have it by default you will get back an empty body
    // npm install body-parser --save -E
  })
});
```
#### Create and update data in angular
1. in a new tab watch webpack
- webpack --watch
2. use q provider to bundle a request to the server
3. in app/scripts/services/data.js
- add q in
.service('dataService', function($http, $q))
