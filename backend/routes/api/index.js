const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/shops', require('./shops'));

module.exports = router;