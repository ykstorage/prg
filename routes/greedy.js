var express = require('express');
var router = express.Router();
const ctrlGreedy = require('../controllers/greedy');

router.get('/jursey', ctrlGreedy.jursey);

module.exports = router;
