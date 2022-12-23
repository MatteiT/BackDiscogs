const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    collectionName: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Collection'
    },
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    text: {
        type: String,
    },
    year: {
        type: Number,
    },
    uri : {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    
    DiscogsId: {
        type: Number,
        required: true,
    }
},{
    timestamps: true
}
);

module.exports = mongoose.model('Album', albumSchema);


