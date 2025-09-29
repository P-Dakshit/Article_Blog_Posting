const pool = require('../connection/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const { error } = require('winston');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userCheck = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        )
        if (userCheck.rows.length === 0) {
            logger.info(`User with email:${email} dosent exist`);
            return res.status(400).json({
                error: `Invalid email`
            });
        }
        const user = userCheck.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            logger.info(`Invalid Password`);
            return res.status(400).json({
                error: `Invalid Password`
            });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JSONTOKEN,
            { expiresIn: '12h' }
        )

        logger.info(`Logged in successful`);
        res.status(200).json({
            token,
            user: {
                id: user.id,
                name: user.username,
                email: user.email,
                role: user.role
            }
        });
    }
    catch (err) {
        logger.error(`Unable to Login`);
        res.status(500).json({
            error: err.message
        });
    }
}

module.exports = { login }