'use strict'

const mongoose = require('mongoose');

const leaseSchema = mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account',
        required: true
    }, 
    cellar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cellars',
        required: true
    },
    additionalServices: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
            required: true
        }]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Lease', leaseSchema);