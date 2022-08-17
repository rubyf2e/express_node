var express = require('express');
var router = express.Router();
const { getIngredients } = require('./../google-sheet.js');

router.get('/', function (req, res, next) {
  (async () => {
    res.render('ingredients', { ingredients: await getIngredients() });
  })();
});

module.exports = router;
