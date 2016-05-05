'use strict';

const co = require('co');
const bcrypt = require('bcrypt');
const uuid = require('node-uuid');

var login = {

   check_request: (req, res, next) => co(function*(){

      var email = 'mariosiliop92@gmail.com';
      var password = '123456';

      var users = global.connection.collection('users');

      var result = yield users.find({email: email}).toArray();

      var correct_password =
         yield new Promise(resolve => bcrypt.compare(password, result[0].password, (error, result) => resolve(result)));

      if(correct_password) { req.accept_user = true; req.uid = result[0].uid; }
      else res.end();

      next();

   }),

   session_token: (req, res, next) => co(function*(){

      if(req.accept_user){

         var cookies = global.connection.collection('cookies');
         var token = uuid.v1();

         yield cookies.insert({
            uid: req.uid,
            cookie: token
         });

         res.cookie('session_token', token, {
   			maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
   		});

         res.send({success: true});

      }
      else res.send({success: false});
      next();

   })

};

module.exports = login;
