const express = require('express');
const router = express.Router();
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPost,
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getPosts).post(protect, createPost);
router.route('/:id').put(protect, updatePost).delete(protect, deletePost);
router.route('/:id').get(protect, getPost);
// code on line 5 and 6 is the same as line 10 to 13

// router.get('/',  protect, getPosts)
// router.post('/', protect, createPost)
// router.put('/:id', protect, updatePost)
// router.delete('/:id', protect, deletePost)

module.exports = router;
