var express = require('express');
var router = express.Router();
const ctrlStackq = require('../controllers/stackq');

router.get('/same-number', ctrlStackq.sameNumber);

module.exports = router;
