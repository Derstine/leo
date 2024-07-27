const { setID, updateID } = require('../models/dbModel')

const ReturnObject = require('./returnObject')

async function readMessage(clientID, message) {
  try {
    messageJSON = JSON.parse(message);

    if(messageJSON.command || messageJSON.info) {
      var command = messageJSON.command;
      var info = messageJSON.info;

      if(command === 'update-power') {
        commandRes = await updateID(clientID, {power: info})
      }

      return new ReturnObject(true);
    } else {
      return new ReturnObject(false, 'Could not find command or info variable in JSON in readMessage() in readDeviceMessages.js')
    }
  } catch(error) {
    return new ReturnObject(false, 'Could not read message', error);
  }
}

module.exports = readMessage;