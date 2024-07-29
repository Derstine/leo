const ReturnObject = require('./returnObject')
const Connection = require('./connectionTypes')

const { docExists, objectExists } = require('../models/dbModel')

async function validateClient(type, id) {
  // if it doesn't have a type
  if(type !== Connection.WEB && type !== Connection.DEVICE) {
    return new ReturnObject(false, 'Client type not allowed');
  }

  // if id not found in database
  if(!await docExists('ids', id)) {
    return new ReturnObject(false, 'Client not found')
  }

  // if it doesn't have the required objects
  if(!await objectExists('ids', id, 'ws', 'boolean')) {
    return new ReturnObject(false, 'Required information not found')
  }

  return new ReturnObject(true)
}

module.exports = validateClient;