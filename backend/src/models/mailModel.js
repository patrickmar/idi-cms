const mongoose = require('mongoose');
const MailSchema = mongoose.Schema({
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
        required: [true, 'please add a email field']
    },
    phoneNo: {
        type: String,
        required: [true, 'please add a phone number field']
    },
    subject:{
        type: String,
        required: [true, 'please add a subject field']
    },    
    message:{
        type: String,
        required: [true, 'please add the message field'],
    },
    company: {
        type: String,
        required: false
    }
}, { 
    timestamps: true
})
module.exports = mongoose.model('Mail', MailSchema);