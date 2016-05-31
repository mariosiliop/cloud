'use strict';

const fs = require('fs');
const co = require('co');

var pages = {

   send: (req, res) => {

      console.log(req.params.pages + ' PAGES');

      if(req.params.pages){
            res.send(fs.readFileSync('./assets/'+req.params.pages+'.html').toString('utf8'));
      }
      else {
         console.log('mpainw edw mesa');
         res.end(fs.readFileSync('./assets/index.html').toString('utf8'));
      }

   }

};

module.exports = pages;
