'use strict';

const co = require('co');


var logout = (req, res, next) => co(function*(){

   if(req._cookie) {

      var cookies = global.connection.collection('cookies');

      yield cookies.remove({cookie: req._cookie});

      res.send('logouted..');

   }

   next();

});

module.exports = logout;
