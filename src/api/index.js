'use strict';
// Express API
var express = require('express');
var todos = require('../../mock/todos.json');

// router code
var router = express.Router();

// GET route
router.get('/todos', function(req,res){
  res.json({todos: todos});
  // res.send returns text/html when the parameter is a string
  // res.send('these are the todos') > switch to res.json
});

// TODO Add a POST route to create new entries

// TODO add a PUT route to update entries

// TODO add a DELETE route to delete entries

module.exports = router
