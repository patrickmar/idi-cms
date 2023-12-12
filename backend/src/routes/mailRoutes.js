const express = require('express');
const { createEmail, getEmails } = require('../controllers/mailController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
 
//router.post('/', createEmail) 

router.route('/').get(protect, getEmails).post(createEmail);

module.exports = router; 