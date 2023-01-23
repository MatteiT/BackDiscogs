const mongoose = require('mongoose');
const wantedSchema = new mongoose.Schema({
    playlist : [{
        type : Object,
        required : true,
    }],
    collection : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Collection',
        required : true,
    },
    date : {
        type : Date,
        default : Date.now,
    },
},
{
    timestamps : true,
}
);

module.exports = mongoose.model('Wanted', wantedSchema);
