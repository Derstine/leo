const express = require("express");
const cors = require("cors");

const accounts = require ("./controllers/accountsController");

const app = express();

app.use(express.json());

app.use(cors());

app.use('/accounts', accounts);

module.exports = app;