const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true
        },
    role : [{
        type: String,
        default : 'user',
        enum: ['user', 'admin']
    }],
    usercollection: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection'
    }]
},{
    timestamps: true
}
);

module.exports = mongoose.model('User', userSchema);