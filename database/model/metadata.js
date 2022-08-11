const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const metaData = new Schema({
    lastRun : {
        type: Date,
        default: Date.now
    }
})

module.exports = new mongoose.model('metaData', metaData)