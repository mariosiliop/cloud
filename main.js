'use strict';

console.log(process.argv.join(' '));

const ROLE = process.argv.join(' ').match(/\-(r|\-role)[ ]+([a-z0-9]*)/i)[2];
const PORT = process.argv.join(' ').match(/\-(p|\-port)[ ]+([0-9]*)/i)[2];

console.log(ROLE);

const fs = require('fs');

for(let file of fs.readdirSync('./src/classes'))
    global[file.split('.')[0]] = require('./src/classes/' + file);

if(ROLE==='app')
global.app = new App(PORT);

if(ROLE==='storage')
global.storage = new Storage(PORT);
