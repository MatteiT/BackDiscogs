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
        lowercase: true,
        unique: true,
        validate: {
            validator: function(value) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
            },
            message: "Invalid email format"
        }
    },
    role : {
        type: String,
        default : 'user',
        enum: ['user', 'admin'],
        lowercase: true,
        select: false
    },
    usercollection: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection'
    }]
},{
    timestamps: true
}
);

module.exports = mongoose.model('User', userSchema);
