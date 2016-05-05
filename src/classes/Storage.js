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

var dbconn;

module.exports = class Storage {

   constructor(PORT){

      console.log(PORT + " port");

      mongodb.connect('mongodb://marios/cloud', function(err, dbc){

			 dbconn = global.connection = dbc;

		});

		var expressApp = express();

		expressApp.use(bodyParser.urlencoded({ extended: true }))
                .use(cookieParser());

      var server = http.createServer(expressApp);

      // API calls

      expressApp.post('/add', this.done);


		expressApp.use(express.static('./cloud/assets'));

		server.listen(PORT, '10.240.0.4');

   }

   done(req, res) {

      var writeStream = fs.createWriteStream('img.jpg');

      req.on('data', c => writeStream.write(c));
      req.on('end', () => {
          res.write('1');
          res.end('200');
          console.log('file saved.');
      });

      console.log('irthame kai edw palikari mou! ');
      console.log(req.file);

      res.end('comple');

   }

};
