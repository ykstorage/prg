var express = require('express');
var router = express.Router();
const ctrlCodingTest = require('../controllers/coding-test');

router.get('/transform-string', ctrlCodingTest.transformString); // 변형 문자열
router.get('/schedule', ctrlCodingTest.schedule); // 시간표

module.exports = router;
