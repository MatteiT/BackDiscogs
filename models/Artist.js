const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    collectionName: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Collection'
    },
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    type: {
        type: String,
        required: true,
    },
    imageurl: {
        type: String,
    },
    uri : {
        type: String,
        required: true,
    },
    ArtistId: {
        type: Number,
        required: true,
    }
},{
    timestamps: true
}
);

module.exports = mongoose.model('Artist', artistSchema);


