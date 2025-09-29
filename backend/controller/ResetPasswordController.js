const pool = require('../connection/db');
const logger = require('../utils/logger');
const bcrypt = require('bcrypt');

const resetPassword = async(req, res) => {
    const { email, password, otp } = req.body;
    try {
        const checkUser = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        )
        if(checkUser.rows.length === 0 ){
            logger.info(`User with email: ${email} not Found`);
            return res.status(400).json({message: `User not Found`});
        }
        const user = checkUser.rows[0];
        
        if(new Date() > new Date(user.reset_expires)){
            logger.info(`Otp Expired!`);
            return res.status(400).json({error: `Otp Expired!`});
        }

        if(user.reset_otp !== otp){
            logger.info(`Invalid OTP`);
            return res.status(400).json({error: `Invalid OTP`});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            'UPDATE users SET password=$1, reset_expires=NULL, reset_otp=NULL WHERE email=$2',
            [hashedPassword, email]
        )

        logger.info(`Password Reseted with email: ${email}`);
        res.status(200).json({message: `Password Reset Successfully!`});
    }
    catch (err) {
        logger.error(`Failed to reset password: ${err.message}`);
        res.status(500).json({ error: `Failed to reset password` });
    }
}

module.exports = { resetPassword };