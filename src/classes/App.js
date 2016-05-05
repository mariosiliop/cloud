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
    dest: './'
});

var dbconn;

module.exports = class App {

   constructor(PORT){
      console.log(PORT + " app");

      mongodb.connect('mongodb://marios/cloud', function(err, dbc){

			 dbconn = global.connection = dbc;

		});

		var expressApp = express();

		expressApp.use(bodyParser.urlencoded({ extended: true }))
                .use(cookieParser());

      var server = http.createServer(expressApp);

      var auth = require('../../routes/authentication.js');
      var reg = require('../../routes/register');
      var pages = require('../../routes/pages.js');
      var login = require('../../routes/login.js');
      var logout = require('../../routes/logout.js');

      expressApp.get('/api/register', [reg.check_request, reg.unique, reg.entry]);
      expressApp.get('/api/login', [login.check_request, login.session_token]);
      expressApp.get('/api/logout', [auth.valid_cookie, logout]);
      expressApp.post('/add', upload.single('photo'), this.other.bind(this));

      expressApp.get('/', [pages.send] );

		expressApp.use(express.static('./cloud/assets'));

		server.listen(PORT, '10.240.0.4');


   }

   other(req, res) {

      var filename = req.file.filename;

         co(function*(){

            var file = fs.createReadStream('./' + filename);

             var request = http.request({
                 method: 'post',
                 host: '10.240.0.4',
                 port: 8090,
                 path: '/add',

             }, function(res){
                 res.on('data', c => console.log(c.toString('utf8')));
                 res.on('end', () => {
                     console.log('response end.');
                 });
             });

             file.pipe(request);
             file.on('end', () => {
                 console.log('file sent.');
                 request.end();
             });

         yield res.end('done');

      });
   }

};
