var express = require('express');
var router = express.Router();
const ctrlHash = require('../controllers/hash');

router.get('/ponketmon', ctrlHash.ponketmon); // 폰켓몬
router.get('/marathon', ctrlHash.marathon); // 완주하지 못한 선수

module.exports = router;
