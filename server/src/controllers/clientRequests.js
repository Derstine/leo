const express = require('express');
const router = express.Router();
const WebSocket = require('ws');

const { getWsConnection } = require('../services/wsClientsManager')

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

module.exports = router;