const ReturnObject = require('./returnObject')
const MODEL = require('./modelsEnum')

const { docExists, objectExists } = require('../models/dbModel')

async function validateClient(type, id) {
  // if it doesn't have a type
  if(type !== MODEL.WEB && type !== MODEL.ESP8266) {
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

async function validateInit(id, model) {
  // id is found in db
  if(docExists('ids', id)) {
    return new ReturnObject(false, 'ID already exists');
  }

  // model is not valid
  if(model !== MODEL.WEB && model !== MODEL.ESP8266) {
    return new ReturnObject(false, 'Model is not allowed');
  }

  return new ReturnObject(true);
}

module.exports = {validateClient, validateInit};