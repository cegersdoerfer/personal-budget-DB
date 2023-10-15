const mongoose = require('mongoose');

const myBudget = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    }
}, {myBudget: 'myBudget'});