// allowing for more asynchronous and readable file system operations.
const fs = require("fs");
const util = require("util");

// imports the db.json file located in the ../../db/ directory and extracts the notes property from it
// the notes variable will then contain the data stored in the notes property of the imported JSON file.
// const { notes } = require('../../db/db.json');

// imports the noteFunctions.js module located in the ../../lib/ directory and extracts the noteCreatedNewNote and noteDeleteNote properties from it.
// these variables will then hold the functions exported by the noteFunctions.js module, allowing use of these functions
// const { noteCreatedNewNote, noteDeleteNote, saveNewNote } = require('../../lib/noteFunctions');

// grabs a specific functionality from the "uuid" module and it's taking a function from "uuid" that generates a unique identifiers
// "It's essentially like plucking out a tool from a toolbox and giving it a convenient name for frequent use." [REF: Bootcamp Spot - 'Xpert Learning Assistant AI']
const { v4: uuidv4 } = require("uuid");
const readFileAsync = util.promisify("fs.readFile");
const writeFileAsync = util.promisify("fs.writeFile");
class Store { 
    read(){
        return readFileAsync('db/db.json', 'utf8');
    }
    write(note){
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }
getNotes(){
    return this.read().then((notes) => {
        let displayNotes;
        try {
            displayNotes = [].concat(JSON.parse(notes))
        } catch (error) {
            displayNotes = []
        } 
        return displayNotes;
    })
}
addNote(note){
    const {title, text} = note;
    const newNote = { title, text, id: uuidv4() };
    return this.getNotes()
    .then((notes) => [...notes, newNote])
    .then((updatedNotes) => this.write(updatedNotes))
    .then(() => newNote)
}

removeNote(id){
//pulling by the id
return this.getNotes()
    .then((notes) => [...notes, newNote])
    const removeNote = note.filter((note) => note.id !== id);
    
}
}