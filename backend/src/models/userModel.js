const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'please add a first name field']
    },
    lastName: {
        type: String,
        required: [true, 'please add a last name field']
    },
    email: {
        type: String,
        required: [true, 'please add an email field'],
        unique: true
    },
    phoneNo: {
        type: String,
        required: [true, 'please add a phone number field']
    },
    password: {
        type: String,
        required: [true, 'please add a password field']
    },
    image: {
        public_id: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: false
        }
    },
    role: {
        type: String,
        required: false
    },
    department: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    }    
}, { 
    timestamps: true 
})

module.exports = mongoose.model('User', userSchema);