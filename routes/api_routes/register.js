'use strict';

const bcrypt = require('bcrypt');
const co = require('co');
const validator = require('validator');
const uuid = require('node-uuid');

var register = {

   check_request: (req, res, next) => {

      var username = req.query.fullname;
      var password = req.query.password;
      var email = req.query.email;

      req.valid_values = "false";

      if (validator.isEmail(email))
      if (username.length > 4)
      if (password.length >= 6)
      req.valid_values = "true";

      next();

  },

  unique: (req, res, next) => co(function*(){

     var users = global.connection.collection('users');
     var email = req.query.email;

     var user_exist = yield users.find({email: email}).toArray();

     if (user_exist[0]) req._exist = 'true';
     else req._exist = 'false';

     next();

 }),

  entry: (req, res, next) => co(function*(){


     var data;

     console.log(req.valid_values + ' ' + req._exist );

     if (req.valid_values === 'true' && req._exist === 'false') {

        var username = req.query.username;
        var pass = req.query.password;
        var email = req.query.email;

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

        data = {success: true};

     } else {
        data = {success: false};
     }

     console.log(data);
     res.send(data);
     next();

  })

};

module.exports = register;
