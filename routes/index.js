var express = require('express');
var router = express.Router();

var time = function (req, res, next) {
	var responseText = 'Requested at: ' + req.requestTime + '';
	console.log(responseText);
	next();
}

router.get('/', [time], function (req, res, next) {
	next();
}, function (req, res) {
	res.render('index', {staticUrl:process.env['STATIC_URL']});
});

module.exports = router;
