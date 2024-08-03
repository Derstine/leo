const express = require('express');
const router = express.Router();
const WebSocket = require('ws');

const { getWsConnection } = require('../services/wsClientsManager')
const initClient = require('../services/initClient')
const { validateInit } = require('../services/validation')
const ReturnObject = require('../services/returnObject')

router.put('/device/:id/power/:power', (req, res) => {
  const { id, power } = req.params;

  console.log('id: ', id, ' power: ', power);

  const ws = getWsConnection(id)
  if(!ws) {
    res.send('ws not fonud');
  } else if(ws.readyState !== WebSocket.OPEN) {
    res.send('ws not connected');
  }

  ws.send(JSON.stringify({power: power}))

  res.send('worked')
})

router.post('/create-client', async (req, res) => {
  try {
    const { id, model } = req.body;
  
    var ro_validateInit = await validateInit(id, model);
    if(!ro_validateInit.success()) {
      ro_validateInit.log();
      return res.status(400).json({message: 'Model or ID not valid'});
    }
  
    await initClient(id, model)
  
    res.status(200).json({message: 'Client successfully created'})
  } catch (error) {
    res.status(500).json({message: 'Failed to initialize client'})
  }
})

module.exports = router;