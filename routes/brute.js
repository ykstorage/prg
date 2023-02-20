var express = require('express');
var router = express.Router();
const ctrlBrute = require('../controllers/brute');

router.get('/exam', ctrlBrute.exam);
router.get('/rectangle', ctrlBrute.rectangle);

module.exports = router;
