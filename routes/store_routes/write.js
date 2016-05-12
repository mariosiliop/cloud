'use strict';

const fs = require('fs');
const mkdirp = p => new Promise(r => require('mkdirp')(p,r));
const co = require('co');

var write = {

   toDisk: (req, res) => co(function*(){

      console.log(req.params.filename);

      var file = req.params.filename;

      yield mkdirp(global.path);

      var writeStream = fs.createWriteStream(`./${global.path}/${file}`);

      req.on('data', c => writeStream.write(c));
      req.on('end', () => {
          res.write('1');
          res.end('200');
          console.log('file saved.');
      });

   })

};


module.exports = write;
