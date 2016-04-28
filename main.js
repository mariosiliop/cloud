'use strict';

const fs = require('fs');

for(let file of fs.readdirSync('./src/classes'))
    global[file.split('.')[0]] = require('./src/classes/' + file);

global.app = new App();
