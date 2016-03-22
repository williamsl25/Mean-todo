'use strict';

// express server_____________________________
 var express = require('express');

 var parser = require('body-parser');

 var router = require('./api');

 // create instance of express server
 var app = express();

 require('./database');

 require('./seed');

// root route
app.use('/', express.static('public'));

app.use(parser.json());

app.use('/api', router);

 app.listen(3000, function(){
   console.log("The server is running on port 3000");
 })
 // starts server nodemon or src/app.js
