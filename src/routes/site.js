const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

// router.get('/:page', siteController.paginate);
router.get('/', siteController.index)
  .get('/:page', siteController.index);

module.exports = router;