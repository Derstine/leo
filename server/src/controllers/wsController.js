const { addWsConnection, closeWsConnection } = require('../services/wsClientsManager')
const { setID, updateID } = require('../models/dbModel')
const readMessage = require('../services/readDeviceMessages')

async function wsController(ws, req) {
  const clientID = req.url.substring(1);
  addWsConnection(clientID, ws);

  console.log('New client, id: ', clientID);

  await setID(clientID, {'ws': true, 'power': true})

  ws.on("message", async (message) => {
    // read message function
    var res = await readMessage(clientID, message);
    if(!res.isSuccess()) {
      res.log();
    }
  });

  ws.on("close", async () => {
    console.log("client disconnected");
    closeWsConnection(clientID)
    await updateID(clientID, {'ws': false});
  });
}

module.exports = wsController;