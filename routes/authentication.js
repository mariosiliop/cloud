'use strict';

const co = require('co');

var authentication = {

   valid_cookie: (req, res, next) => co(function*(){

      var cookies = global.connection.collection('cookies');
      var cookie = 'b1f6edd0-0e3e-11e6-8bcf-b709da0e457a';

      var familiar = yield cookies.find({cookie: cookie}).toArray();

      if(familiar[0]) req._cookie = familiar[0].cookie;
      else res.send('no authenticated user');

      next();
   })

};

module.exports = authentication;
