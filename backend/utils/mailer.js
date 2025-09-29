const nodemailer = require('nodemailer');
const logger = require('./logger')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD
    }
});

const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: `Article Blog App <${process.env.EMAIL}>`,
            to,
            subject,
            html
        });
        logger.info(`Successfully sent an email to: ${to}`);
        return true;
    }
    catch (err) {
        logger.error(`Unable to send email: ${err.message}`);
        return false;
    }
};

module.exports = sendEmail;