const router = require("express").Router();

const {
    notes
} = require('../../db/db.json');

const {
    noteCreatedNewNote, 
    noteDeleteNote
} = require('../../lib/noteFunctions');

router.get('/notes', (req, res) => {
    let saved = notes;
    res.json(saved);
})

router.post('/notes', (req, res)=> {
    req.body.id = notes.length.toString();
    let note = noteCreatedNewNote(req.body, notes);
    res.json(note);
})

router.delete('/notes/:id',(req, res) => {
    let notes = loadNotes();
    let id = req.params.id;
    let updatedNotes = notes.filter(note => note.id !== id);
    saveNotes(updatedNotes);
    res.json({ message: `Note with id ${id} has been deleted` });
});

module.exports = router;