const WebSocket = require('ws');
const app = require('./app');
const wsController = require('./src/controllers/wsController');

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const server = new WebSocket.Server({ port: 8080 });

console.log('Websocket is running on http://locahost:8080');
server.on("connection", wsController);