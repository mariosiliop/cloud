'use strict';

const co = require('co');
const uuid = require('node-uuid');
var _ = require('underscore');

var folder = {

   new_folder: (req, res) => co(function*(){

      if (req._cookie) {

         console.log(req.body.folder_name);

         var cookie = global.connection.collection('cookies');
         var folder = global.connection.collection('folders');

         var user = yield cookie.find({cookie: req._cookie}).toArray();

         var fid = uuid.v1();

         var parent_folder;
         if(req.body.fid) parent_folder = req.body.fid;
         else parent_folder = "0";

         yield folder.insert({
            fid: fid,
            uid: user[0].uid,
            folder_name: req.body.folder_name,
            parent: parent_folder
         });

      }

      res.end();
   }),

   send_documents: (req, res) => co(function*(){

      console.log(req.body );
      var folders = global.connection.collection('folders');

      var ufolders = yield folders.find({parent: req.body.fid}).toArray();


      var data = global.connection.collection('userdata');

      var udata = yield data.find({parent: req.body.fid}).toArray();

      var r = ufolders.concat(udata);

      if(!r[0])
      res.send([{message: 'Empty folder'}]);

      res.send(JSON.stringify(r));
   }),

   back_documents: (req, res) => co(function*(){

      console.log(req.body );
      var folders = global.connection.collection('folders');

      var ufolders = yield folders.find({fid: req.body.fid}).toArray();
      console.log(ufolders[0]);

      var data = global.connection.collection('userdata');

      var udata = yield data.find({parent: ufolders[0].parent}).toArray();

      var r = ufolders.concat(udata);
      console.log(r);
      if(!r[0])
      res.send([{message: 'Empty folder'}]);

      res.send(JSON.stringify(r));

   })


};

module.exports = folder;
