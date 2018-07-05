var express = require('express');
var path = require('path');
var router = express.Router();

/* GET users listing. */
router.use('/static', express.static('sources'));

router.get('/', function(req, res, next) {
  res.send('aaaaaaaaaaaaa!!!');
});

router.get('/blia', function(req, res, next) {
    res.send('ббббббееееее!');
});
module.exports = router;
