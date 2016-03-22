'use strict';

var Todo = require('./models/todo');

var todos = [
  'go grocery shopping',
  'go to post office',
  'walk the dogs',
  'water plants'
];

// iterate over the array
todos.forEach(function (todo, index) {
  Todo.find({ 'name': todo }, function(err, todos) {
    // look for the todo that is equal to the string
    if (!err && !todos.length) {
      // if there is not an error and todo does not exist, then create it
      Todo.create({ completed: false, name: todo });
    };
  });
});
