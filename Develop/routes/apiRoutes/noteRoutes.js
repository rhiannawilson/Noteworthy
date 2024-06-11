const router = require("express").Router();
const path = require("path");
const fs = require("fs").promises;

const { notes } = require('../../db/db.json');
const { noteCreatedNewNote, noteDeleteNote } = require('../../lib/noteFunctions');

const { v4: uuidv4 } = require("uuid");


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
