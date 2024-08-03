const { setID, updateID } = require('../models/dbModel')
const { getWsConnection, wsExistsAndReady } = require('./wsClientsManager')
const WebSocket = require('ws');


const ReturnObject = require('./returnObject')

async function readMessage(id, message) {
  try {
    messageJSON = JSON.parse(message);
    console.log(messageJSON)

    // if request is in json and the id is an active ws connection
    if('request' in messageJSON && wsExistsAndReady(messageJSON.request)) {
      var device = getWsConnection(messageJSON.request);

      if('light' in messageJSON) {
        device.send(JSON.stringify({requester: id, light: messageJSON.light}))
      }

      return new ReturnObject(true);
    } 
    // else if request is an update (comes from a device)
    else if('update' in messageJSON) {
      var web = getWsConnection(messageJSON.request);

      if('light' in messageJSON) {
        if(web !== undefined) {web.send(JSON.stringify({updater: id, light: messageJSON.light}))}
        await updateID(id, {'status.power': messageJSON.light})
      }

      return new ReturnObject(true);
    } else {
      return new ReturnObject(false, 'Message read but not accepted')
    }
  } catch(error) {
    return new ReturnObject(false, 'Could not read message', error);
  }
}

module.exports = readMessage;