const ReturnObject = require('./returnObject')
const MODEL = require('./modelsEnum')

const { docExists } = require('../models/dbModel')

async function validateClient(id) {
  // if id is an empty string
  if(!id || id === '' || typeof id !== 'string') {
    return new ReturnObject(false, 'No ID given');
  }

  // if id not found in database
  if(!(await docExists('ids', id))) {
    return new ReturnObject(false, 'Client not found')
  }

  return new ReturnObject(true)
}

async function validateInit(id, model) {
  // id is found in db
  if(await docExists('ids', id)) {
    return new ReturnObject(false, 'ID already exists');
  }

  // model is not valid
  if(model !== MODEL.WEB && model !== MODEL.ESP8266) {
    return new ReturnObject(false, 'Model is not allowed');
  }

  return new ReturnObject(true);
}

module.exports = {validateClient, validateInit};