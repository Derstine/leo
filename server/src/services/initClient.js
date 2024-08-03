const { setID, docExists } = require('../models/dbModel');
const ReturnObject = require('./returnObject');
const MODEL = require('./modelsEnum')

async function initClient(id, model) {
  setID(id, {config: {model: model}, status: createStatus(model)});
}

function createStatus(model) {
  if(model === MODEL.WEB) {
    return {connected: false, clients: []};
  } else if(model === MODEL.ESP8266) {
    return {connected: false, clients: [], power: false};
  }
  return {};
}

module.exports = initClient;