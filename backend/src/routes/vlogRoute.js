const express = require('express');
const { createVlog } = require('../controllers/vlogController');
const router = express.Router();

router.route('/').post(createVlog);

module.exports = router;
