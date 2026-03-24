const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
    items: [{
      "id": 1,
      "name": "Рома"
    },
      {
        "id": 2,
        "name": "Саша"
      }]
  });
});

module.exports = router;
