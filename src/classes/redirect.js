'use strict';

const fs = require('fs');

var x = (req, res, next) => {

	res.end(fs.readFileSync('./assets/index.html').toString('utf8'));
   next();
};


module.exports = x;
