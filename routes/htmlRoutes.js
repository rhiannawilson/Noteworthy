// importing the router module from the Express Framework
const router = require('express').Router();

// "/notes" responds with the notes.html file
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

 // GET Route for homepage
 app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
  );

// router module exported to make it available for use
module.exports = router;

