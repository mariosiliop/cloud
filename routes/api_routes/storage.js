'use strict';

const co = require('co');
const fs = require('fs');
const http = require('http');

var storage = {

   send: (req, res) => {

      var filename = req.file.filename;

      co(function*(){

         var file = fs.createReadStream('./' + filename);

          var request = http.request({
              method: 'post',
              host: '10.240.0.4',
              port: req._PORT,
              path: '/add/' + filename
          }, function(response){
             response.on('data', c => console.log(c.toString('utf8')));
             response.on('end', () => {
               console.log('response end.');
               fs.unlink('./' + filename);
             });
          });

          file.pipe(request);
          file.on('end', () => {
             console.log('file sent.');
              request.end();
          });

         yield res.end('done');

      });

   },

   selectStoreDB: (req, res, next) => co(function*(){

      if (req._cookie) {

         var dbs = global.connection.collection('dbs');

         var minSize = yield dbs.find().sort({size: 1}).limit(1).toArray();

         console.log('DB on port : ' + minSize[0].port + '.');
         req._PORT = minSize[0].port;

         var size = minSize[0].size + req.file.size;

         dbs.update(
            {_id: minSize[0]._id},
            { $set: {size: size} }
         );

         var cookies = global.connection.collection('cookies');

         var cookie = 'b2d566f0-0e3e-11e6-8bcf-b709da0e457a';
         var user =  yield cookies.find({cookie: cookie}).toArray();

         if(user[0]){
            try{
               var data = global.connection.collection('userdata');

               console.log(req.file);

               data.insert({
                  uid: user[0].uid,
                  file: req.file.filename,
                  original_name: req.file.originalname,
                  port: req._PORT,
                  parent: "0"
               });
            } catch (err) {
               console.log(err);
            }
         }

      }

      next();

   })

};

module.exports = storage;
