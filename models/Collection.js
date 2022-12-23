const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    collectionId: {
        type: Number
    },
    Artist : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    }],
    Album : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    }],
    Wanted : [{
        type : String
    }]
},
{
    timestamps: true
}
);


module.exports = mongoose.model('Collection', collectionSchema);


