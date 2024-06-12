const fs = require("fs");

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

module.exports = {
    noteCreatedNewNote,
    noteDeleteNote
};