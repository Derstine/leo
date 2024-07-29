const { addWsConnection, closeWsConnection } = require('../services/wsClientsManager')
const { initWsConnection, terminateWsConnection } = require('../services/wsConnections')
const Connection = require('../services/connectionTypes')
const { setID, updateID } = require('../models/dbModel')
const readMessage = require('../services/readDeviceMessages')
const url = require('url');

async function wsController(ws, req) {
  const parameters = url.parse(req.url, true).query;
  // type is either client or device
  // id is code that can indentify client or device
  const { type, id } = parameters;

  var roWsConnection = await initWsConnection(type, id, ws);
  if(!roWsConnection.success()) {
    ws.close(1003, 'Websocket connected but not allowed')
    roWsConnection.log(); // log error
  }

  ws.on("message", async (message) => {
    // read message function
    var res = await readMessage(clientID, message);
    if(!res.success()) {
      res.log();
    }
  });

  ws.on("close", async () => {
    // implies that type is correct and id is in db
    if(roWsConnection.success()) {
      terminateWsConnection(type, id, ws);
    }
  });
}

module.exports = wsController;