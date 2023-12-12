const nodemailer = require('nodemailer');
const path = require('path')
const hbs = require('nodemailer-express-handlebars');


const sendEmailWithIcons = async (props) => {
    const {emailSubject, sendTo, sentFrom, replyTo, template, context} = props;

    let transporter = nodemailer.createTransport({
        host: process.env.EMAILHOST, //'server276.web-hosting.com',
        port: 465, //587 for tls 
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAILUSER,	//'support@atendiconsulting.com', 
            pass: process.env.EMAILPASSWORD //'support@avante'
        },
        tls: { rejectUnauthorized: false }
    });

    const handlebarOptions = {
        viewEngine: {
            extName: ".handlebars",
            partialsDir: path.resolve('./src/views'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./src/views'),
        extName: ".handlebars",
    }

    transporter.use('compile', hbs(handlebarOptions));

    // setup email data with unicode symbols
    let mailOptions = {
        from:  sentFrom, //`${firstName} ${lastName} <${process.env.EMAILUSER}>`, //'"Nodemailer Contact" <support@atendiconsulting.com>',
        to: `${sendTo}`, // EMAILBLINDCOPY 
        replyTo: replyTo != undefined ? replyTo : undefined,
        subject: emailSubject,
        text: process.env.EMAILTEXT,
        template: template,
        context: { 
            year: new Date().getFullYear(),
            baseURL: process.env.BASEURL, 
            companyName: process.env.COMPANYNAME, 
            customerCareLine: process.env.CUSTOMERCARELINE,
            ...context,
        },
        attachments: [
            { filename: 'logo.png', path: __dirname + '/../assets/email/logo.png', cid: 'logo'}, 
            { filename: 'icon-facebook.png', path: __dirname + '/../assets/email/icon-facebook.png', cid: 'icon-facebook'}, 
            { filename: 'icon-linkedin.png', path: __dirname + '/../assets/email/icon-linkedin.png', cid: 'icon-linkedin'}, 
            { filename: 'icon-twitter.png', path: __dirname + '/../assets/email/icon-twitter.png', cid: 'icon-twitter'}, 
            { filename: 'icon-instagram.png', path: __dirname + '/../assets/email/icon-instagram.png', cid: 'icon-instagram'},
            // { filename: 'icon-positive-vote-1.png', path: __dirname + '/../assets/email/icon-positive-vote-1.png', cid: 'positive' },
        ]
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            //console.log('Error is', error);
            const data = { success: false, error: error, message: 'Error sending email' };
            //return data;
        }

        // console.log('Message sent: %s', info.messageId);
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        const data = { success: true, message: 'Email sent successfully', info: info.envelope, previewURL: nodemailer.getTestMessageUrl(info) }
        //return data;
    });
};

module.exports = sendEmailWithIcons;