const ReturnObject = require('./returnObject')
const MODEL = require('./modelsEnum')
const { addWsConnection, closeWsConnection } = require('../services/wsClientsManager')
const { updateID } = require('../models/dbModel')

async function initWsConnection(id, ws) {
  try {
    addWsConnection(id, ws)
  
    await updateID(id, {'status.connected': true})
  
    return new ReturnObject(true)
    
  } catch (error) {
    return new ReturnObject(false, 'Something went wrong in websocket initialization', error);
  }
}

async function terminateWsConnection(id) {
  closeWsConnection(id)

  await updateID(id, {'status.connected': false})
}

async function handleWsMessages(message, type, id, ws) {

}

module.exports = {
  initWsConnection,
  terminateWsConnection
};