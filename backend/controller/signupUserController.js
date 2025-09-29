const pool = require('../connection/db');
const bcrypt = require('bcrypt');
const logger = require('../utils/logger');

const signup = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const existsUser = await pool.query(
            'SELECT email FROM users WHERE email = $1',
            [email]
        )
        if (existsUser.rows.length > 0) {
            logger.info(`User with email:${email} Already Exists`);
            return res.status(400).json({
                error: `User Already Exists`
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role',
            [username, email, hashedPassword, role]
        );
        logger.info(`New user registered: ${result.rows[0].email}`);
        res.status(201).json({
            message: 'User Created',
            user: result.rows[0]
        });
    }
    catch (err) {
        logger.error(`User registration Failed: ${err}`);
        res.status(500).json({
            error: err.message
        })
    }
}

module.exports = { signup };