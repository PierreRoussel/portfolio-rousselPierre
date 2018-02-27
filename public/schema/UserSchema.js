var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    user: {
        login: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    mail: {
        type: String,
        required: true,
        unique: true
    },
    companyName: {
        type: String,
        required: true,
        unique: true
    },
    companyNameSlug: {
        type: String,
        required: true,
        unique: true
    },
    logo: {
        type: String
    },
    page: {
        presentation: String,
        contact: {
            telephone: String,
            website: String,
            facebook: String,
            twitter: String,
            instagram: String
        },
        address: {
            type: String
        },
        schedule: {
            type: String
        }
    },
    leftIndicator: Number,
    rightIndicator: Number,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isSuperAdmin: Boolean
}, {
    collection: 'entreprise'
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
