var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var router = express.Router();

/* GET users listing. */
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/static/send_json', jsonParser,  function (req, res) {
    fs.writeFile("sources/myJson.JSON", JSON.stringify(req.body.myJson), function(error){
        if(error) throw error; // если возникла ошибка
        res.end('ok!');
    });
});

router.get('/static/myJson.JSON', function (req, res) {
    fs.readFile("sources/myJson.JSON", "utf8",
        function(error,data){
            if(error) throw error; // если возникла ошибка
            var myObj = data;
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(myObj); //JSON.stringify(myObj, null, 2)
        });
});

router.use('/static', express.static('sources'));

router.get('/', function(req, res, next) {
  res.send('aaaaaaaaaaaaa!!!');
});

router.get('/blia', function(req, res, next) {
    res.send('ббббббееееее!');
});
module.exports = router;
