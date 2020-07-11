// UserData.js
// class for storing user information on the server
var md5 = require('md5');

class UserData {
    constructor(username, passwordHash, email) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.email = email;
    }

    /**
     * Check if a password is correct
     * @param {String} hashed The stored hashed password
     * @param {String} password The password to check
     */
    static checkPassword(hashed, password) {
        return md5(password) == hashed;
    }

    /**
     * hash a password for storage in db
     * @param {String} password the password to hash
     */
    static hashPassowrd(password) {
        return md5(password);
    }
} module.exports = UserData;