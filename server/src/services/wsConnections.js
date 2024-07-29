const ReturnObject = require('./returnObject')
const Connection = require('./connectionTypes')
const { addWsConnection, closeWsConnection } = require('../services/wsClientsManager')
const { initWebFirestore, terminateWebFirestore } = require('../models/webModel')

async function initWsConnection(type, id, ws) {
  if(type === Connection.WEB || type === Connection.DEVICE) {
    addWsConnection(type, id, ws)

    if(type === Connection.WEB) {
      var ro_initWebFirestore = await initWebFirestore(id)
      if(!ro_initWebFirestore.success()) {
        ro_initWebFirestore.log();
      }
    } else {
      // type is device
      
    }

    // return success
    return new ReturnObject(true)
  } else {
    // stop everything
    return new ReturnObject(false, ('Connection type is undefined, recieved type: ' + type))
  }
}

async function terminateWsConnection(type, id, ws) {
  closeWsConnection(id)

  if(type === Connection.WEB) {
    terminateWebFirestore(id)
  }
}

async function handleWsMessages(message, type, id, ws) {

}

module.exports = {
  initWsConnection,
  terminateWsConnection
};