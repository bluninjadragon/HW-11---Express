const express = require("express");
const path = require("path");
const fs = require('fs');
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const { v4: uuidv4 } = require("uuid");

// const apiRoutes = require("./routes/apiRoutes");
// const htmlRoutes = require("./routes/htmlRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let notes = [];

// app.use(htmlRoutes);
// app.use(apiRoutes);


//tried to make it work by putting it in a router folder and exporting it and it failed. dumping all that code in server file now. what happened was that by sending the file to ../ in the route, it kept calling that ../ when it was in server.js which was messing up the file pathing

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });
  
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"))
  });
  
app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    notes.push(newNote);
    writeFileAsync(path.join(__dirname, "./db/db.json"), JSON.stringify(notes));
    res.json(newNote);
      });

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));