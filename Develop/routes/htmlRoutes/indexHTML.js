const path = require('path');
const router = require('express').Router();

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