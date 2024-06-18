// importing the Express.js framework into the Node.js application and creating an instance of the Express application
const express = require('express');

// Require API Routes and HTML Routes modules located at these folders
const apiRoutes = require('./routes/apiRoutes')
// const indexRoutes = require('./routes/apiRoutes/noteRoutes')
const htmlRoutes = require('./routes/htmlRoutes')

// bringing in the express engine
const app = express(); 
// asking app to listen on port 3001 - in the terminal it'll should generate text assigned below 'App listening at (portURL)
const PORT = process.env.port || 3001;

// const { clog } = require('./middleware/clog');


// // requiring the Node.js built-in modules fs and path 
// const fs = require('fs')
// const path = require('path');

// MIDDLEWARE 

// this middleware function parses incoming requests with JSON payloads
// allows my appliation to handle JSON data sent by clients such as API Requests or AJAX requests 
app.use(express.json());

// this middleware function parses incoming requests with URL-encoded payloads, used extract form data and allows parsing of URLencoded data with objects and arrays
app.use(express.urlencoded({ extended: true }));

// // Static Files - this middleware function is serving static files from the 'public' directory, when a request is made for a file Express will look for the file in Develop/public directory.
app.use(express.static('public'));

// Additional notes: payload = meaningful data being exchanged between different parts of a system over a network, e.g. a client and server in an HTTP request/response cycle, or between components in a messaging system.

// handle routes that start with /api and '/'
// so that when a request matches the route, it is then passed onto the apiRoutes and htmlRoutes middleware for further handling
app.use('/api', apiRoutes); // api route
app.use('/', htmlRoutes); // homepage route

// this function is used to start the Express server and make it listen for incoming requests on a specified port and executes a callback function that logs a message to the console. 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
