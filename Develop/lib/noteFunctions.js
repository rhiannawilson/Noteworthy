const fs = require("fs");

// Attempt to read 'input.txt'
fs.readFile('apiRoutes.js', 'utf8', (err, data) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error('File not found!');
      return;
    }
    console.error('Error reading file:', err);
    return;
  }
  console.log('File contents:', data);
});

// https://nodejs.org/en/learn/manipulating-files/nodejs-file-paths
// includes the path module from Node.js's standard library and assigns it the variable named path
const path = require("path")

// this function adds a new note to an array of exisitng notes
function noteCreatedNewNote(body, noteTakerArray) {
    const note = body;
    noteTakerArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '..db/db.json'),
        JSON.stringify({
            notes: noteTakerArray
        }, null, 2)
        )
        return note;
};

// functon to delete a note from an array of notes (noteTakerArray) based on its ID (id), 
// updates the indexes of the remaining notes, and then writes the modified array back to a JSON file (db.json).
function noteDeleteNote(noteTakerArray, id) {
    let deleteID = parseInt(id);
    noteTakerArray.splice(deleteID, 1);

    // this loop re-writes the indexes for the remaining notes
    for (let i = deleteID; i < noteTakerArray.length; i++) {
        noteTakerArray[i].id = i.toString();
    }

    fs.writeFileSync(
        path.join(_dirnam, '../db/db.json'),
        JSON.stringify({
            notes: noteTakerArray
        }, null, 2)
    )
}


function saveNewNote(noteTakerArray, newNote) {
    // Add the new note to the array
    noteTakerArray.push(newNote);

    // Write the updated array back to the JSON file
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({
            notes: noteTakerArray
        }, null, 2)
    );
}
module.exports = {
    noteCreatedNewNote,
    noteDeleteNote,
    saveNewNote
};

