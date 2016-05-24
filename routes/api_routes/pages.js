'use strict';

const fs = require('mz/fs');
const co = require('co');

var pages = {

   send: (req, res, next) => co(function*(){
      res.end((yield fs.readFile('./assets/index.html')).toString('utf8'));

      next();

   })

};

module.exports = pages;
