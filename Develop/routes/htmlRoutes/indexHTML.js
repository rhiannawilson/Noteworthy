const path = require('path');
const router = require('express').Router();

// router.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../public/index.html"));
//   });

// router.get("/notes", (req, res) => {
//     res.sendFile(path.join(__dirname, "../public/notes.html"));
//   });
  
 
  
//   module.exports = router;

router.get('/notes', (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '../../public/notes.html'));
    } catch (error) {
        next(error);
    }
});

router.get("*", (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '../../public/index.html'));
    } catch (error) {
        next(error);
    }
});

module.exports = router;