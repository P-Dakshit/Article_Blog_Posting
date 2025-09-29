const pool = require('../connection/db');
const logger = require('../utils/logger');

const AllUsers = async (req, res) => {
    try {
        const id = req.user.id;

        const UserCheck = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
        if (UserCheck.rows.length < 1) {
            logger.info(`User doesnt exist!`);
            return res.status(404).json({ error: `User doesnt exist!` });
        };
        const user = UserCheck.rows[0];

        if (user.role === 'admin') {
            const Users = await pool.query(`SELECT id, username, email, role FROM users`);
            logger.info(`Successfully get all users`);
            return res.status(200).json({
                message: `Successfully get all users`,
                users: Users.rows
            });
        }
        else {
            logger.info(`Access Denied!`);
            return res.status(403).json({ error: `Forbidden request!` });
        }
    }
    catch (err) {
        logger.error(`Unable to get all users: ${err.message}`);
        res.status(500).json({ error: `Unable to get all users` });
    }
}

const DeleteUser = async (req, res) => {
    try {
        const id = req.user.id;
        const { id: userId } = req.params;

        const UserCheck = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
        if (UserCheck.rows.length < 1) {
            logger.info(`User doesnt exist!`);
            return res.status(404).json({ error: `User doesnt exist!` });
        };
        const user = UserCheck.rows[0];

        if (user.role === 'admin') {
            const userExistCheck = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId]);
            if (userExistCheck.rows.length < 1) {
                logger.info(`Target user with id=${userId} not found`);
                return res.status(404).json({ error: `User not found` });
            }
            await pool.query('DELETE FROM users WHERE id = $1', [userId]);
            logger.info(`User with ${userId} deleted!`);
            return res.status(200).json({ message: `User with ${userId} deleted` });
        }
        else {
            logger.info(`Access Denied!`);
            return res.status(403).json({ error: `Forbidden request!` });
        }
    }
    catch (err) {
        logger.error(`Unable to delete user: ${err.message}`);
        res.status(500).json({ error: `Unable to delete user` });
    }
}

module.exports = { AllUsers, DeleteUser };