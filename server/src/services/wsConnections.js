const ReturnObject = require('./returnObject')
const Connection = require('./modelsEnum')
const { addWsConnection, closeWsConnection } = require('../services/wsClientsManager')
const { initWebFirestore, terminateWebFirestore } = require('../models/webModel')

async function initWsConnection(type, id, ws) {
  try {
    addWsConnection(type, id, ws)
  
    if(type === Connection.WEB) {
      var ro_initWebFirestore = await initWebFirestore(id)
      if(!ro_initWebFirestore.success()) {
        ro_initWebFirestore.log();
      }
    } else {
      // type is device
      
    }
  
    return new ReturnObject(true)
    
  } catch (error) {
    return new ReturnObject(false, 'Something went wrong in websocket initialization', error);
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