var express = require('express');
var router = express.Router();
const ctrlHash = require('../controllers/hash');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/hash/ponketmon', ctrlHash.ponketmon);

module.exports = router;
