'use strict';

var mongoose = require('mongoose');
// create a connection
mongoose.connect('mongodb://localhost/mean-todo', function(err){
  if (err){
    console.log('Failed connecting to MongoDB!');
  }
  else {
    console.log('Successfully connected to MongoDB!')
  }
  // check terminal nodemon and see if connected to MongoDB
});

// **** require('./database'); in app.js ****
