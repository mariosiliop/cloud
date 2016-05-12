'use strict';


const co = require('co');
const fs = require('mz/fs');
const http = require('http');
const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const validator = require('validator');
const uuid = require('node-uuid');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer({ dest: './' });

var dbconn , _PORT;

module.exports = class Storage {

   constructor(PORT){

      console.log(PORT + " port");

      mongodb.connect('mongodb://marios/cloud', function(err, dbc){

			 dbconn = global.connection = dbc;

		});

      global.path = `storage${PORT}`;
      
		var expressApp = express();

		expressApp.use(bodyParser.urlencoded({ extended: true }))
                .use(cookieParser());

      var server = http.createServer(expressApp);

      var write = require('../../routes/store_routes/write.js');

      // API calls
      expressApp.post('/add/:filename', [write.toDisk ]);


		expressApp.use(express.static('./cloud/assets'));

		server.listen(PORT, '10.240.0.4');

   }

};
