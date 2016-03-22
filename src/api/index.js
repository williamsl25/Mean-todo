'use strict';
// Express API
var express = require('express');
var Todo = require('../models/todo');
// var todos = require('../../mock/todos.json');

// router code
var router = express.Router();

// GET route
router.get('/todos', function(req,res){
  Todo.find({}, function(err, todos) {
    if(err){
      // in mongoose, first callback is always error
      return res.status(500).json({message: err.message});
      // 500 is an internal service error
      }
      res.json({todos: todos});
  // res.send returns text/html when the parameter is a string
  // res.send('these are the todos') > switch to res.json
  });
});

// POST route to create new entries
  router.post('/todos', function(req, res){
    var todo = req.body; // body of the request will be the data for our todos

    //store todo in database
    Todo.create(todo, function(err, todo){
      if(err){
        return res.status(500).json({err: err.message});
        // the callback will exit and the route will end
      }
      res.json({'todo': todo, message: 'Todo created'});
      // need to add a body parser bc express does not have it by default you will get back an empty body
      // npm install body-parser --save -E
    })
  });

// PUT route to update entries
router.put('/todos/:id', function(req, res) {
  var id = req.params.id;
  var todo = req.body; // body of the request will be the data for our todos
  if (todo && todo._id !== id) {
    return res.status(500).json({ err: "Ids don't match!" });
  }
  //store todo in database
  Todo.findByIdAndUpdate(id, todo, {new: true}, function(err, todo) {
    if (err) {
      return res.status(500).json({ err: err.message });
      // the callback will exit and the route will end
    }
    res.json({ 'todo': todo, message: 'Todo Updated' });
    // need to add a body parser bc express does not have it by default you will get back an empty body
    // npm install body-parser --save -E
  })
});

// TODO add a DELETE route to delete entries

module.exports = router;
