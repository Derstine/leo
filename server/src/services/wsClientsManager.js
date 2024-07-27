var wsClients = {};

function addWsConnection(id, ws) {
  wsClients[id] = ws;
}

function closeWsConnection(id) {
  delete wsClients[id];
}

function getWsConnection(id) {
  return wsClients[id];
}

module.exports = {
  addWsConnection,
  closeWsConnection,
  getWsConnection,
};