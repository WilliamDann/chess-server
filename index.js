// CHESS SERVER
//    To teach harrison programming
// index.js - This file starts the server
var express = require('express')
var bodyParser = require('body-parser');

// create app
let port = 8080;
let host = '127.0.0.1';

var app = express();
app.use(express.static('public/'));
app.use(bodyParser.urlencoded({ extended: false }));

// parse cmd args
let args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) { 
    switch (args[i]) {
        case '-p':
        case '--port':
            port = parseInt(args[i+1])       
            break;
        
        case '-h':
        case '--host':
            host = args[i+1];
            break;
    }
}

// run our programmed routes
// TODO implement better database
require('./src/chessgame')(app, {});

app.listen(port, host, () => console.log("! Server running on " + port));