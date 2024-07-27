const express = require('express');
const cors = require('cors');

const clientRequests = require('./src/controllers/clientRequests.js');

const app = express();
// Middleware to parse JSON bodies
app.use(express.json()); // For parsing application/json

// Enable CORS for all routes
app.use(cors());

app.use('/client-requests', clientRequests);

module.exports = app;