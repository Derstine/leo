const ReturnObject = require('./returnObject')
const Connection = require('./connectionTypes')
const { addWsConnection, closeWsConnection } = require('../services/wsClientsManager')
const initWebFirestore = require('../models/webModel')

async function initWsConnection(type, id, ws) {
  if(type === Connection.WEB || type === Connection.DEVICE) {
    addWsConnection(type, id, ws)

    if(type === Connection.WEB) {
      initWebFirestore(id)
      // update ws value
      // get each added_device and push the web id to those devices in the db
    } else {
      // type is device
      // update ws value
    }

    // return success
    return new ReturnObject(true)
  } else {
    // stop everything
    return new ReturnObject(false, ('Connection type is undefined, recieved type: ' + type))
  }
}

async function handleWsMessages(message, type, id, ws) {

}

module.exports = {
  initWsConnection
};