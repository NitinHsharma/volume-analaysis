const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
    name: String,
    price: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            number: {
                type: Number,
            }
        }
    ],
    volume: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            quantity: {
                type: Number,
            }
        }
    ],
    delivery: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            quantity: {
                type: Number,
            }
        }
    ],
}, {
    timestamps: true
});

module.exports = mongoose.model('Stock', stockSchema);