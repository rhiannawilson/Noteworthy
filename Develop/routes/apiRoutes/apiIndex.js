// importing the router module from the Express Framework
const router = require('express').Router();

// imports the routes defined in another file named 'noteRoutes.js'
const notesRoutes = require('../apiRoutes/noteRoutes.js')

// router object USE method to mount the routes defined in noteRoutes into the current router
router.use(notesRoutes);

// router module exported to make it available for use
module.exports = router;
