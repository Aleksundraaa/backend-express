const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name text)`);

router.get('/', function (req, res, next) {
    db.all("SELECT id, name FROM users", [], (err, rows) => {
        console.log(rows);
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
    db.run(insert, [name], function(err) {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.status(201).json({ id: this.lastID, name: name });
        }
    });
})


router.get('/:id', function (req, res, next) {
    let userId = parseInt(req.params.id);
    db.get("SELECT id, name FROM users WHERE id = ?", [userId], (err, row) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Database error' });
        } else if (!row) {
            res.status(404).json({ error: 'User not found' });
        }
    });
});

module.exports = router;
