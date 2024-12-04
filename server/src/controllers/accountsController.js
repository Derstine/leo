const express = require("express");

const accounts = express.Router();

accounts.put('/create/:user/:pass', (req, res) => {
    const { user, pass } = req.params;
  
    console.log(user, pass);
})

module.exports = accounts;