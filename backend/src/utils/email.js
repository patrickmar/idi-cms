const nodemailer = require('nodemailer');
const path = require('path')
const hbs = require('nodemailer-express-handlebars');

const sendEmail = async (props) => {
    const { emailSubject, sendTo, sentFrom, replyTo, template, context } = props;

    let transporter = nodemailer.createTransport({
        host: process.env.EMAILHOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAILUSER,
            pass: process.env.EMAILPASSWORD
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
        from: sentFrom,
        to: `${sendTo}`,
        replyTo: replyTo ? replyTo : undefined,
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
            { filename: 'logo.png', path: __dirname + '/../assets/email/logo.png', cid: 'logo' },
        ]
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            const data = { success: false, error: error, message: 'Error sending email' };
            return data;
        }

        const data = { success: true, message: 'Email sent successfully', info: info.envelope, previewURL: nodemailer.getTestMessageUrl(info) }
        return data;
    });
};

module.exports = sendEmail;