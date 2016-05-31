'use strict';

const bcrypt = require('bcrypt');
const co = require('co');
const validator = require('validator');
const uuid = require('node-uuid');
const fs = require('mz/fs')

var register = {

   check_request: (req, res, next) => {

      console.log(req.body);

      var username = req.body.username;
      var password = req.body.password;
      var email = req.body.email;

      req.valid_values = "false";

      if (validator.isEmail(email))
      if (username.length > 4)
      if (password.length >= 6)
      req.valid_values = "true";

      next();

  },

  unique: (req, res, next) => co(function*(){

     var users = global.connection.collection('users');
     var email = req.body.email;

     var user_exist = yield users.find({email: email}).toArray();

     if (user_exist[0]) req._exist = 'true';
     else req._exist = 'false';

     next();

 }),

  entry: (req, res) => co(function*(){

     var data = [{}];


     if (req.valid_values === 'true' && req._exist === 'false') {

        console.log('teleiwsame..');
        var username = req.body.username;
        var pass = req.body.password;
        var email = req.body.email;

        var users = global.connection.collection('users');

        var salt = yield new Promise(resolve => bcrypt.genSalt(10, (err, res) => resolve(res)));
        var password = yield new Promise(resolve => bcrypt.hash(pass, salt, (err, res) => resolve(res)));
        var id = uuid.v1();

        yield users.insert({
          uid: id,
          username: username,
          password: password,
          email: email
        });

        data[0] = {success: true};
        data[1] = {message: "Signed up!"};
     } else {
        console.log(req.valid_values + ' ' + req._exist);
        data[0] = {success: false};
        data[1] = { message:'No valid data' };
        console.log(data + ' DATA');

     }


     res.send(data);

  })

};

module.exports = register;
