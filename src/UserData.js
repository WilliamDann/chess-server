// UserData.js
// class for storing user information on the server

class UserData {
    constructor(username, passwordHash, email) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.email = email;
    }
} module.exports = UserData;