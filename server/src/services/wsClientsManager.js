const WebSocket = require('ws');

var wsClients = {};

// returns error if type not connection or client
function addWsConnection(id, ws) {
  wsClients[id] = ws;
}

function closeWsConnection(id) {
  delete wsClients[id];
}

function getWsConnection(id) {
  return wsClients[id];
}

function wsExistsAndReady(id) {
  if(id in wsClients && wsClients[id].readyState === WebSocket.OPEN) {
    return true;
  }
  return false;
}

module.exports = {
  addWsConnection,
  closeWsConnection,
  getWsConnection,
  wsExistsAndReady,
};