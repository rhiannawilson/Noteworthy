// importing the router module from the Express Framework
const router = require("express").Router();
// const path = require("path");
const store = require("../db/store") //build and connect with our database
// fs refers to the file system module in Node.js, specifically using its Promise-based functionality. 

// this route fetches notes, sends them back as a JSON response if successful, and handles errors by logging them and sending an appropriate error response.
router.get("/notes", async (req, res) => {
  
});

// this route creates a new note with a unique id, adds it to the existing notes, saves the updated notes, and sends back the newly created note as a JSON response. 
router.post("/notes", async (req, res) => {
  store
  .addNote()
  .then((note) => {
    return res.json(note)
  })
  .catch((err) => res.status(500).json(err))
  });
  
// this route deletes a note with a specific id from the existing notes, updates the notes array, saves the updated notes, and then sends a success message back to the client.

  router.delete("/notes/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const note = await readNotes();
      const updatedNotes = note.filter((note) => note.id !== id);
      await writeNotes(updatedNotes);
      res.json({ message: "Note deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete note" });
    }
  });

  module.exports = router;
