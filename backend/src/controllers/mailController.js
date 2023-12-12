const asyncHandler = require('express-async-handler');
const Mail = require('../models/mailModel');
const sendEmail = require('../utils/email');

//const post('/send', (req, res) => {
const createEmail = asyncHandler(async (req, res) => {
  try {
    const props = {
      emailSubject: req.body.subject,
      sendTo: process.env.SUPPORTEMAIL,
      sentFrom: process.env.EMAILUSER,
      replyTo: req.body.email,
      template: 'contact-form',
      context: req.body,
    };

    const mail = await Mail.create(req.body);
    await sendEmail(props);

    res
      .status(200)
      .json({ success: true, message: 'Email sent successfully', data: mail });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// get all mails
const getEmails = asyncHandler(async (req, res) => {
  if (!req.user.id) {
    res.status(400);
    throw new Error('No authorization token');
  }
  const mails = await Mail.find();

  res
    .status(200)
    .json({
      success: true,
      message: 'mails fetched successfully',
      data: mails,
    });
});

module.exports = {
  createEmail,
  getEmails,
};
