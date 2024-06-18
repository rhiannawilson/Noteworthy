// importing the router module from the Express Framework
const express = require('express');

const router = require('express').Router();

const app = express();
// "/notes" responds with the notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

 // GET Route for homepage
 app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

// router module exported to make it available for use
module.exports = router;

