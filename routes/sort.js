var express = require('express');
var router = express.Router();
const ctrlSort = require('../controllers/sort');

router.get('/k', ctrlSort.k);

module.exports = router;
