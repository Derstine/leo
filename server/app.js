const express = require('express');
const cors = require('cors');

const clientRequests = require('./src/controllers/clientRequests.js');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/client-requests', clientRequests);

module.exports = app;