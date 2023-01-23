const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    text: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    wanted : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Wanted',
        required : false,
    }],
},
{
    timestamps: true
}
);


module.exports = mongoose.model('Collection', collectionSchema);


