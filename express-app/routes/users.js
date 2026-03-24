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

router.post('/', function(req, res, next) {
  let newUserReq = req.body;
  let newUser = {
    "id": newUserReq.id,
    "name": newUserReq.name,
  }
  res.status(201).json(newUser);
})

module.exports = router;
