### Set up Express
1. create a mean-todo directory
2. create SRC folder that will contain all node
3. turn it into a node project
```
npm init
```
4. change entry point to src/app.js in package.json - this will start the app
5. create PUBLIC folder for angular app - for static files, plain html, images,css
6. clone angular-basics app from treehouse into PUBLIC folder
  * git clone git@github.com:treehouse/angular-basics.git .
  * the period at the end will clone it into the PUBLIC folder
  * when we clonged it git creates a .git folder - remove the .git directory

```
rm -rf .git
```

7. install express - npm will create node_module
  * npm install express --save

8. create the app.js file in SRC folder
  * touch src/app.js
  * echo 'node_modules' >> .gitignore

9. git init, git add -A, git commit -m ''
10. in src/app.js

```
'use strict';

var express =  require('express');

var app = express();

app.listen(3000, function(){
  console.log("the server is running on port 3000!")
  });
  ```

11. npm install -g nodemon  => nodemon restarts the server when files change
12. nodemon in terminal
13. tell express to serve static files from the public folder in src/app.js - ROOT route
```
app.use('/', express.static('public'));
```

14. express should be serving the angular-basics app from the public directory
___________________________________________________________________________
### Set up an Express API
1. src/app.js set up GET route

  * route definition takes two parameters: route, callback
```
app.get('/todos', function(req, res){
  res.send('These are the todos');
  })
```

2. see that it is working by going to localhost:3000/api/todos
3. we don't want to have our routes to conflict with routes in the public folder so prefix it with api
4. res.send is a call back function and is used to return info back to the browser - the info returnes is a response
 - res.send takes a string and this returns the string with content type header to the browser of the text HTML
 - our API is going to return JSON and needs to return a content type of json so make sure to change it to return a json object
 ```
 res.json({todos:[]});
 ```

5. you don't want to prefix routes w api, so use a router
```
var router = express.Router();
```

```
router.get('/todos', function(req, res){
  res.send('These are the todos');
  })
```

```
app.use('/api', router);
```

6. this is where routes will go in application

  * TODO: GET route will get all todos
  * TODO: POST route to create entries
  * TODO: PUT route to update entries
  * TODO: DELETE route to delete entries
_______________________________________________________________
### Create an API controller
1. clean up app.js file and move API router to its own file
2.  create new folder called api and move routes to the file
3.  touch index.js inside api folder - this will act as our API module
4.  add use strict and include our dependency express
```
'use strict';
// Express API
var express = require('express');
```

5.  move router code here
  * make sure to leave app.use('/api', router); in app.js bc it will be used to import our router

6.  export the code as an imported module
```
module.exports = router;
```

7.  go back to app.js and say our router is the API module that we have required
```
var router = require('./api');
```

8.  we are mounting our router to the api url
_____________________________________________________________
### Create mock data
1. create mock folder
2. create todos.json
3. import data into our API controller in api/index.js
```
var todos = require('../../mock/todos.json');
```

4. in our response, import our mock json data - index.js
```
res.json({todos: todos});
```

5. use postman to check routes
6. in postman GET  => http://localhost:3000/api/todos
7. you should see the mock data
_____________________________________________________________
### Connecting angular app to the express API

* SEE NOTES FOR ANGULAR BASICS course
* app folder is the angular app

### GET todos
1. replace mock todos with todos from server
2. app/scripts/services/data.js
```
this.getTodos = function(cb) {
  $http.get('/api/todos').then(cb);
};
```

3. app/scripts/controllers/main.js
```
dataService.getTodos(function(response){
  var todos = response.data.todos;
  $scope.todos =  todos;
});
```

### webpack
1.  create webpack.config.js file

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

2. in app.js
* add require statements

```
var angular = require('angular');

require('./scripts/controllers/main.js');
```

  * run webpack in terminal

### in app/scripts/controllers/main.js
```
require angular
var angular = require('angular');
```
  * run webpack

### At the top of all of your Angular files
( /controllers/main.js , /controllers/todo.js , /directives/todo.js, /services/data.js )

below the 'use strict' statement : You need to add the following.

```var angular = require('angular');
```

### Once those have been updated, your app.js file should look like this.
```
'use strict';

var angular = require('angular');

angular.module('todoListApp', []);

require('./scripts/controllers');
require('./scripts/directives');
require('./scripts/services');
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
```
Todo.find({}, function(err, todos) {
  if(err){
    return console.log(err);
    }
    res.json({todos: todos});
  });
```

### creating seed data
1. load data - create src/seed.js
2. require('./seed'); in app.js
3. in seed.js
```
var Todo = require('./models/todo');
```

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
```
.service('dataService', function($http, $q))
```

* $interval will keep javascript updated

* app/scripts/controllers/main.js

* takes the function as fist parameter - create a counter function and excute it on each interval

- takes 1 sec as the second parameter
- takes # of intervals as third parameter
```
$interval($scope.counter(), 1000, 10);
```

* $log
* create the counter function to log a String
```
$scope.counter = function(){
  $scope.seconds++;
  $log.log($scope.seconds + ' have passed!');
}
```

* initialize the counter
```
$scope.seconds = 0;
```
