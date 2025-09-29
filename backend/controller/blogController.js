const pool = require('../connection/db');
const logger = require('../utils/logger');

const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const auther_id = req.user.id;
        const image_url = req.file ? `${req.file.filename}` : null;

        const result = await pool.query(
            `INSERT INTO blogs (title, content, image_url, author_id)
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [title, content, image_url, auther_id]
        )

        logger.info(`Blog Created \n Data: ${result.rows[0]}`);
        res.status(201).json({ message: `Blog Created \n Data: ${result.rows[0]}` });
    }
    catch (err) {
        logger.error(`Unable to create Blog: ${err.message}`);
        res.status(500).json({ error: `Unable to create Blog` });
    }
}

//admin can access these
const getAllBlogs = async (req, res) => {
    try {
        const results = await pool.query(
            `SELECT b.*, u.username as author
            FROM blogs b
            JOIN users u ON b.author_id = u.id
            ORDER BY b.created_at`
        )
        logger.info(results.rows);
        res.json(results.rows);
    }
    catch (err) {
        logger.error(`Failed to fetch blogs:${err.message}`);
        res.status(500).json({ error: `Unable to get all blogs` })
    }
}

const getBlogById = async (req, res) => {
    try {
        const userId = req.user.id;
        const results = await pool.query(
            `SELECT * 
             FROM blogs 
             WHERE author_id = $1
             ORDER BY created_at DESC`,
            [userId]
        );

        if (!results.rows.length) {
            return res.status(404).json({ message: 'No blogs found for this user' });
        }

        logger.info(results.rows);
        res.json(results.rows);
    }
    catch (err) {
        logger.error(`Failed to fetch blogs by ID:${err.message}`);
        res.status(500).json({ error: `Unable to get blogs by Id` })
    }
}

const updateBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const userId = req.user.id;
        const userRole = req.user.role;

        // Check ownership or admin
        const blogCheck = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);
        if (!blogCheck.rows.length) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const blog = blogCheck.rows[0];
        if (blog.author_id !== userId && userRole !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // If new image uploaded, replace it. Otherwise keep old one
        const imageUrl = req.file ? `${req.file.filename}` : blog.image_url;

        const result = await pool.query(
            `UPDATE blogs 
            SET title=$1, content=$2, image_url=$3, updated_at=NOW() 
            WHERE id=$4 
            RETURNING *`,
            [title, content, imageUrl, id]
        );

        res.json(result.rows[0]);
    }
    catch (err) {
        logger.error(`Failed to update blogs by ID:${err.message}`);
        res.status(500).json({ error: `Unable to update blog by Id` })
    }
}

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const userRole = req.user.role;

        const blogCheck = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);
        if (!blogCheck.rows.length) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const blog = blogCheck.rows[0];
        if (blog.author_id !== userId && userRole !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await pool.query('DELETE FROM blogs WHERE id = $1', [id]);
        res.json({ message: 'Blog deleted successfully' });
    }
    catch (err) {
        logger.error(`Failed to delete blogs by ID:${err.message}`);
        res.status(500).json({ error: `Unable to delete blog by Id` })
    }
}

const getSingleBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `SELECT b.*, u.username as author
             FROM blogs b
             JOIN users u ON b.author_id = u.id
             WHERE b.id = $1`,
            [id]
        );

        if (!result.rows.length) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        logger.error(`Failed to fetch single blog: ${err.message}`);
        res.status(500).json({ error: "Unable to fetch blog" });
    }
}


module.exports = { createBlog, getAllBlogs, getBlogById, updateBlogById, deleteBlog, getSingleBlog }