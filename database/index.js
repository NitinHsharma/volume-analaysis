const mongoose = require('mongoose');

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect('mongodb://localhost/volume');
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
    }
}

module.exports = new Database();