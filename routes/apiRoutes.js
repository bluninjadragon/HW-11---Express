const router = require("express").Router();
const path = require("path");
const uniqid = require('uniqid');
const fs = require('fs');

router.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../db/db.json"));
  });
  
router.post("/api/notes", (req, res) => {
  let newNote = req.body;
  newNote.id = uniqid();
  fs.readFile("../db/db.json", "utf8", (err, data) => {
      if (err) throw err; 
      const parseData = JSON.parse(data);
      console.log(JSON.parse(data));
      parseData.push(newNote);
      fs.writeFile("../db/db.json", JSON.stringify(parseData), err => {
          if (err) throw err;
          res.json(parseData)
      })
  })
});

  module.exports = router;