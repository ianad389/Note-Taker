//Array
const express = require("express");
const path = require("path")
const fs = require("fs")
const util = require("util")

//Processes 
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile)

// Server setup
const app = express();
const PORT = process.env.PORT || 8000;
app.use (express.urlencoded({extended:true}));
app.use(express.json());

//API Route
app.post("/api/notes", function(req, res) {
    const note = req.body;
    readFileAsync("./develop/db/db.json", "utf8").then(function(data) {
      const notes = [].concat(JSON.parse(data));
      note.id = notes.length + 1
      notes.push(note);
      return notes
    }).then(function(notes) {
      writeFileAsync("./develop/db/db.json", JSON.stringify(notes))
      res.json(note);
    })
});
// API Route | "DELETE" request
app.delete("/api/notes/:id", function(req, res) {
    const idToDelete = parseInt(req.params.id);
    readFileAsync("./develop/db/db.json", "utf8").then(function(data) {
      const notes = [].concat(JSON.parse(data));
      const newNotesData = []
      for (let i = 0; i<notes.length; i++) {
        if(idToDelete !== notes[i].id) {
          newNotesData.push(notes[i])
        }
      }
      return newNotesData
    }).then(function(notes) {
      writeFileAsync("./develop/db/db.json", JSON.stringify(notes))
      res.send('saved success!!!');
    })
  })
  
  
  // HTML Routes
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./develop/public/notes.html"));
    });
  
  app.get("/", function(req, res) {
       res.sendFile(path.join(__dirname, "./develop/public/index.html"));
    });
  
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "./develop/public/index.html"));
   });
  
  
  // Listening
  app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });