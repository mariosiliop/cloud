'use strict';

const co = require('co');
const fs = require('fs');
const http = require('http');
const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const validator = require('validator');
const uuid = require('node-uuid');
const cookieParser = require('cookie-parser');

var dbconn;

module.exports = class App {

   constructor(){

      mongodb.connect('mongodb://marios/cloud', function(err, dbc){

			 dbconn = global.connection = dbc;

		});

		var expressApp = express();

		expressApp.use(bodyParser.urlencoded({ extended: true }));
		expressApp.use(cookieParser());

      var server = http.createServer(expressApp);

      expressApp.get('/', require('redirect'));

		//expressApp.get('/', this.handler);

		expressApp.use(express.static('./assets'));

		server.listen(8081, '10.240.0.4');

   }

};
