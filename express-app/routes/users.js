const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name text)`);


router.get('/', function (req, res, next) {
    db.all("SELECT id, name FROM users", [], (err, rows) => {
   if (err) {
      console.log(err);
   } else {
      res.send(rows);
   }
});
    });

router.post('/', function (req, res, next) {
    let name = req.body.name;
    const insert = "INSERT INTO users (name) VALUES (?)";
    db.run(insert, [name]);
    res.status(201).json({name: name});
})


router.get('/:id', function (req, res, next) {
    
    let userId = parseInt(req.params.id);
    db.get("SELECT id, name FROM users WHERE id = ? ",  [], (err, rows) => {
   if (err) {
      console.log(err);
   } else {
      res.send(rows);
   });

})

module.exports = router;
