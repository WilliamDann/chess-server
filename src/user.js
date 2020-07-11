// user.js
// handle all the web requests for users
var UserData = require('./UserData');
var md5      = require('md5');

module.exports = (app, database) => {
    // request to create a user on the server
    app.post('/api/user/', (req, res) => {
        // check if a requets element is missing
        var missing = null;
        if (!req.body.username) missing = 'username';
        if (!req.body.password) missing = 'password';
        if (!req.body.email)    missing = 'email';

        // if there was an element missing, throw error
        if (missing != null) {
            res.status(400); // bad request
            res.send("'" + missing + "' was missing from the request");
            return;
        }

        // if that user already exists, throw an error
        if (database[req.body.username]) {
            res.status(409); // conflict
            res.send("Username already exists");
            return;
        }

        // store user data
        database[req.body.username] = new UserData(
            req.body.username,
            md5(req.body.password), // password hashed with md5
            req.body.email
        );

        // send 200 OK
        res.send("User created.");
    });

    // request to get user data form the server
    app.get('/api/user/', (req, res) => {
        // check if username is supplied
        if (!req.query.username) {
            res.status(400); // bad request
            res.send("'username' was missing from the request");
            return;
        }

        // check if username exists in db
        if (!database[req.query.username]) {
            res.status(404);
            res.send("User not found");
            return;
        }

        // send user data

        // copy user data & delete password
        let dataCopy = Object.assign({}, database[req.query.username]);
        delete dataCopy.passwordHash;

        // send passwordless data
        res.send(dataCopy);
    });
}