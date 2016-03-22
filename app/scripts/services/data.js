'use strict';
var angular = require('angular');

angular.module('todoListApp')
.service('dataService', function($http, $q) {
  this.getTodos = function(cb) {
    $http.get('/api/todos').then(cb);
  };

  // this.deleteTodo = function(todo) {
  //   console.log("I deleted the " + todo.name + " todo!");
  // };

  this.deleteTodo = function(todo) {
    if (!todo._id) {
      return $q.resolve();
    }
    return $http.delete('/api/todos/' + todo._id).then(function() {
      console.log("I deleted the " + todo.name + " todo!");
    });
  };

  this.saveTodos = function(todos) {
    // create an array of requests we can now use the q service to run all of our requests in parallel
    var queue = [];
    todos.forEach(function(todo) {
        var request;
        if(!todo._id) {
          request = $http.post('/api/todos', todo);
      } else { // use the put route when existing todo is edited
        request = $http.put('/api/todos/' + todo._id, todo).then(function(result) {
            todo = result.data.todo;
            return todo;
          });
      }
      queue.push(request);
    });
    return $q.all(queue).then(function(results){ // iterates through the q runs each request and for all of them returns a promise - with results paramerter
      console.log("I saved " + todos.length + " todos!");

    });

  };

});
