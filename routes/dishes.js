var express = require('express');
var router = express.Router();
const { getSheet, getDishes } = require('./../google-sheet.js');

router.post('/search', function (req, res, next) {
  res.redirect(req.body.keyword);
});

router.get('/:keyword', function (req, res, next) {
  (async () => {
    let dishes = await getDishes();
    let keyword = req.params.keyword;

    if (keyword != '') {
      let findDishes = dishes.find(function(row, index) {
        if (keyword === row.name) {
          return row;
        }
      });

      dishes = (findDishes != undefined) ? [findDishes] : [];
    }

    res.render('dishes', { dishes: dishes, title: '尋找'+keyword });
  })();
});

router.get('/', function (req, res, next) {
  (async () => {
    res.render('dishes', { dishes: await getDishes(), title: '全部食譜' });
  })();
});

module.exports = router;
