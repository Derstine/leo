const { addWsConnection, closeWsConnection } = require('../services/wsClientsManager')
const { initWsConnection, terminateWsConnection } = require('../services/wsConnections')
const { validateClient } = require('../services/validation')
const Connection = require('../services/modelsEnum')
const { setID, updateID } = require('../models/dbModel')
const readMessage = require('../services/readDeviceMessages')
const url = require('url');

async function wsController(ws, req) {
  const parameters = url.parse(req.url, true).query;
  const { id } = parameters;

  var roValidation  = await validateClient(id);
  if(!roValidation.success()) {
    ws.close(1003, 'Websocket connected but not allowed');
    roValidation.log();
    return;
  }

  var roWsConnection = await initWsConnection(id, ws);
  if(!roWsConnection.success()) {
    ws.close(1003, 'Something went wrong in websocket initialization');
    roWsConnection.log();
    return;
  }

  ws.on("message", async (message) => {
    // read message function
    var roReadMessage = await readMessage(id, message);
    if(!roReadMessage.success()) {
      roReadMessage.log();
    }
  });

  ws.on("close", async () => {
    // implies that type is correct and id is in db
    if(roValidation.success()) {
      terminateWsConnection(id);
    }
  });
}

module.exports = wsController;