const router = require("express").Router();
const { notes } = require('../../db/db.json');
const { noteCreatedNewNote, noteDeleteNote } = require('../../lib/noteFunctions');

router.get('/notes', (req, res) => {
    try {
        // Return the notes as JSON
        res.json(notes);
    } catch (error) {
        // Handle any errors
        console.error("Error fetching notes:", error);
        res.status(500).json({ error: "Failed to fetch notes" });
    }
});

router.post('/notes', (req, res) => {
    try {
        // Validate the request body
        if (!req.body || !req.body.title || !req.body.content) {
            return res.status(400).json({ error: "Title and content are required" });
        }

        // Assign an ID and create the new note
        req.body.id = notes.length.toString();
        const note = noteCreatedNewNote(req.body, notes);
        
        // Respond with the newly created note
        res.status(201).json(note);
    } catch (error) {
        // Handle any errors
        console.error("Error creating new note:", error);
        res.status(500).json({ error: "Failed to create new note" });
    }
});

router.delete('/notes/:id', (req, res) => {
    try {
        // Extract the ID from the request parameters
        const id = req.params.id;
        
        // Filter out the note with the given ID
        const updatedNotes = notes.filter(note => note.id !== id);

        // Update the notes array
        // Assuming `loadNotes` and `saveNotes` are functions to load and save notes from/to the database
        // If these functions perform I/O operations, consider using async/await or promises
        saveNotes(updatedNotes);

        // Respond with a success message
        res.json({ message: `Note with ID ${id} has been deleted` });
    } catch (error) {
        // Handle any errors
        console.error("Error deleting note:", error);
        res.status(500).json({ error: "Failed to delete note" });
    }
});

module.exports = router;
