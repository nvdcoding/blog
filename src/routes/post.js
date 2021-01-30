const express = require('express');
const router = express.Router();
const auth = require('../app/middleware/authMiddleware');

const postController = require('../app/controllers/PostController');

router.get('/new', auth, postController.indexCreate);

router.post('/store', auth, postController.store);
router.get('/manage/:page', auth, postController.manager);
router.delete('/manage/remove/:id', auth, postController.remove);

router.get('/manage/update/:id', auth, postController.indexUpdate);
router.put('/manage/update/:id', auth, postController.edit);

router.get('/:id', postController.showPost);
module.exports = router;