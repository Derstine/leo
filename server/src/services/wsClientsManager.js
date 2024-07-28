var wsClients = {};

// returns error if type not connection or client
function addWsConnection(type, id, ws) {
  wsClients[id] = {'type': type, 'websocket': ws};
}

function closeWsConnection(id) {
  delete wsClients[id];
}

function getWsConnection(id) {
  return wsClients[id].websocket;
}

module.exports = {
  addWsConnection,
  closeWsConnection,
  getWsConnection,
};