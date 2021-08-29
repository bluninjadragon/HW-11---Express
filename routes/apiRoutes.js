const router = require("express").Router();

router.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../db/db.json"));
  });
  
  router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../db/db.json"));
  });