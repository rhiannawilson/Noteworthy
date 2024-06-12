// importing the router module from the Express Framework
const router = require("express").Router();
const path = require("path");

// fs refers to the file system module in Node.js, specifically using its Promise-based functionality. 
// allowing for more asynchronous and readable file system operations.
const fs = require("fs").promises;

// imports the db.json file located in the ../../db/ directory and extracts the notes property from it
// the notes variable will then contain the data stored in the notes property of the imported JSON file.
const { notes } = require('../../db/db.json');

// imports the noteFunctions.js module located in the ../../lib/ directory and extracts the noteCreatedNewNote and noteDeleteNote properties from it.
// these variables will then hold the functions exported by the noteFunctions.js module, allowing use of these functions
const { noteCreatedNewNote, noteDeleteNote } = require('../../lib/noteFunctions');

// grabs a specific functionality from the "uuid" module and it's taking a function from "uuid" that generates a unique identifiers
// "It's essentially like plucking out a tool from a toolbox and giving it a convenient name for frequent use." [REF: Bootcamp Spot - 'Xpert Learning Assistant AI']
const { v4: uuidv4 } = require("uuid");

// this route fetches notes, sends them back as a JSON response if successful, and handles errors by logging them and sending an appropriate error response.
router.get("/notes", async (req, res) => {
    try {
        // Return the notes as JSON
        const notes = await readNotes();
        res.json(notes);
    } catch (error) {
        // Handle any errors
        console.error("Error fetching notes:", error);
        res.status(500).json({ error: "Failed to fetch notes" });
    }
});

// this route creates a new note with a unique id, adds it to the existing notes, saves the updated notes, and sends back the newly created note as a JSON response. 
router.post("/notes", async (req, res) => {
    const newNote = { id: uuidv4(), ...req.body };
  
    try {
      const notes = await readNotes();
      notes.push(newNote);
      await writeNotes(notes);
      res.json(newNote);
    } catch (error) {
      res.status(500).json({ error: "Failed to save note" });
    }
  });
  
  
// this route deletes a note with a specific id from the existing notes, updates the notes array, saves the updated notes, and then sends a success message back to the client.

  router.delete("/notes/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const notes = await readNotes();
      const updatedNotes = notes.filter((note) => note.id !== id);
      await writeNotes(updatedNotes);
      res.json({ message: "Note deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete note" });
    }
  });
  
  module.exports = router;
