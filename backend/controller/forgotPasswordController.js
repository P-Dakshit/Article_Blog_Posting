const logger = require('../utils/logger');
const sendMail = require('../utils/mailer');
const pool = require('../connection/db');

const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        const checkUser = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        )
        if (checkUser.rows.length === 0) {
            logger.info(`User Doesn't Exists!`);
            return res.status(400).json({
                error: `User doesn't exists`
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expires = new Date(Date.now() + 5 * 60 * 1000);

        await pool.query(
            'UPDATE users SET reset_otp=$1, reset_expires=$2 WHERE email=$3',
            [otp, expires, email]
        )

        await sendMail(
            email,
            `Otp for password reset`,
            `<p>Otp for password reset is :<b>${otp}</b>. Your otp will expire in 5 minutes</p>`
        )

        logger.info(`Otp set to ${email}`);
        res.status(200).json({ message: 'Otp has been set' });
    }
    catch (err) {
        logger.error(`Forgot Password Failed: ${err.message}`);
        res.status(500).json({ error: `Failed to process forgot password process` });
    }
}

module.exports = { forgotPassword };