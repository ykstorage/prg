var express = require('express');
var router = express.Router();
const ctrlStackq = require('../controllers/stackq');

router.get('/same-number', ctrlStackq.sameNumber); // 같은 숫자는 싫어 (Level 1)

router.get('/development', ctrlStackq.development); // 기능개발 (Level 2)
router.get('/bracket', ctrlStackq.bracket); // 올바른 괄호 (Level 2)
router.get('/printer', ctrlStackq.printer); // 프린터 (Level 2)
// router.get('/truck', ctrlStackq.truck); // 다리를 지나는 트럭 (Level 2)
// router.get('/stock', ctrlStackq.stock); // 주식가격 (Level 2)

module.exports = router;
