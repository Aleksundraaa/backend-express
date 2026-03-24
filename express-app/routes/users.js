const express = require('express');
const router = express.Router();

const userList = [
    {"id": 1, "name": "Рома"},
    {"id": 2, "name": "Саша"}]


router.get('/', function (req, res, next) {
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

router.post('/', function (req, res, next) {
    let newUserReq = req.body;
    let newUser = {
        "id": newUserReq.id,
        "name": newUserReq.name,
    }
    res.status(201).json(newUser);
})

router.get('/:id', function (req, res, next) {
    let userId = parseInt(req.params.id);
    let userFind = userList.find(user => user.id === userId)
    if (!userFind) {
        return res.status(404)
    } else {
        res.status(200).json(userFind);
    }
})

module.exports = router;
