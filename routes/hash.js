var express = require('express');
var router = express.Router();
const ctrlHash = require('../controllers/hash');

router.get('/ponketmon', ctrlHash.ponketmon); // 폰켓몬 (Level 1)
router.get('/marathon', ctrlHash.marathon); // 완주하지 못한 선수 (Level 1)

router.get('/camouflage', ctrlHash.camouflage); // 위장 (Level 2)

router.get('/best-album', ctrlHash.bestAlbum); // 베스트앨범 (Level 3)

module.exports = router;
