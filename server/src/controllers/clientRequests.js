const express = require('express');
const router = express.Router();
const WebSocket = require('ws');

const { getWsConnection } = require('../services/wsClientsManager')
const { initClient } = require('../services/initClient')
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

router.put('/init_device/:id/model/:model', async (req, res) => {
  const { id, model } = req.params;

  var ro_validateInit = await validateInit(id, model);
  if(!ro_validateInit.success()) {
    res.status(500).send(ro_validateInit.res)
  }

  initClient(id, model)

  res.status(200).send('Created client')
})

module.exports = router;