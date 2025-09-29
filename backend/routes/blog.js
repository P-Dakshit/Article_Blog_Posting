const express = require('express');
const upload = require('../middleware/imageUpload');
const verifyToken = require('../middleware/verifyToken');
const { createBlog, getAllBlogs, getBlogById, updateBlogById, deleteBlog, getSingleBlog } = require('../controller/blogController');

const router = express.Router();

router.post('/c_blog', verifyToken, upload.any(), (req, res, next) => {
    if (req.files && req.files.length > 0) {
        req.file = req.files[0];
    }
    next();
}, createBlog);
router.get('/all_blogs', verifyToken, getAllBlogs);
router.get('/blog_id', verifyToken, getBlogById);
router.delete('/d_blog_id/:id', verifyToken, deleteBlog);
router.put('/up_blog_id/:id', verifyToken, upload.any(), (req, res, next) => {
    if (req.files && req.files.length > 0) {
        req.file = req.files[0];
    }
    next();
}, updateBlogById);
router.get('/:id', verifyToken, getSingleBlog);

module.exports = router;