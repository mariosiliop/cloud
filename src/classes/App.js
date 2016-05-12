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
const upload = multer({
    dest: './',
    limits: {
      fileSize: 1000000000
    }
});

var dbconn;

module.exports = class App {

   constructor(PORT){

      console.log(PORT + " app");

      mongodb.connect('mongodb://marios/cloud', function(err, dbc){

			 dbconn = global.connection = dbc;

		});

		var expressApp = express();

		expressApp.use(this.check_request)
                .use(bodyParser.urlencoded({ extended: true }))
                .use(cookieParser());

      var server = http.createServer(expressApp);

      var auth = require('../../routes/api_routes/authentication.js');
      var reg = require('../../routes/api_routes/register');
      var pages = require('../../routes/api_routes/pages.js');
      var login = require('../../routes/api_routes/login.js');
      var logout = require('../../routes/api_routes/logout.js');
      var storage = require('../../routes/api_routes/storage.js');

      expressApp.get('/api/register', [reg.check_request, reg.unique, reg.entry]);
      expressApp.get('/api/login', [login.check_request, login.session_token]);
      expressApp.get('/api/logout', [auth.valid_cookie, logout]);
      expressApp.post('/add', upload.single('photo'), [auth.valid_cookie, storage.selectStoreDB, storage.send]);

      expressApp.get('/', [pages.send] );

		expressApp.use(express.static('./cloud/assets'));

		server.listen(PORT, '10.240.0.4');

   }

   check_request(req, res, next) {

      console.log(req.path);
      next();
   }

};
