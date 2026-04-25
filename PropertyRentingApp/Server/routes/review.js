const router = require('express').Router();
const { createReviews } = require('../controllers/reviewController');
const { verifyToken } = require('../middleware/auth');    

router.post('/', verifyToken, createReviews);

module.exports = router;
