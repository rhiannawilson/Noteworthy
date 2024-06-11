// asking app to listen on port 3001 - in the terminal it'll should generate text assigned below 'App listening at (portURL)
const PORT = process.env.port || 3001;

// importing the Express.js framework into the Node.js application and creating an instance of the Express application
const express = require('express');
const app = express();

// requiring the Node.js built-in modules fs and path 
const fs = require('fs')
const path = require('path');

// Require API Routes and HTML Routes modules located at these folders
const apiRoutes = require('./Develop/public/assets/routes/apiRoutes')
const htmlRoutes = require('./Develop/public/assets/routes/htmlRoutes')


// MIDDLEWARE 

// this middleware function parses incoming requests with URL-encoded payloads, used extract form data and allows parsing of URLencoded data with objects and arrays
app.use(express.urlencoded({
 extended: true 
}));

// // Static Files - this middleware function is serving static files from the 'public' directory, when a request is made for a file Express will look for the file in Develop/public directory.
app.use(express.static('Develop', 'public'));

// this middleware function parses incoming requests with JSON payloads
// allows my appliation to handle JSON data sent by clients such as API Requests or AJAX requests 
app.use(express.json());

// Additional notes: payload = meaningful data being exchanged between different parts of a system over a network, e.g. a client and server in an HTTP request/response cycle, or between components in a messaging system.

// handle routes that start with /api and '/'
// so that when a request matches the route, it is then passed onto the apiRoutes and htmlRoutes middleware for further handling
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'Develop/public/index.html'))
);


// Route to add new data
app.post('/notes', (req, res) => {
  const newItem = req.body;
  data.push(newItem);
  res.status(201).json(newItem);
});

// this function is used to start the Express server and make it listen for incoming requests on a specified port and executes a callback function that logs a message to the console. 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
