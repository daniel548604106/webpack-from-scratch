const express = require('express');
const WebSocket = require('ws');

const app = express();
const port = 3001;

app.use(express.static('public'));

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const wss = new WebSocket.Server({ server });

// Store connected clients with userId
const clients = new Map();

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    const { userId, content } = parsedMessage;

    // Store the client connection with the userId
    clients.set(userId, ws);

    console.log(`Received message from user ${userId}: ${content}`);

    // Broadcast message to all other connected clients
    clients.forEach((clientWs, clientId) => {
      if (clientId !== userId) {
        clientWs.send(JSON.stringify({ userId, content }));
      }
    });
  });

  ws.on('close', () => {
    // Remove the client when they disconnect
    clients.forEach((clientWs, clientId) => {
      if (clientWs === ws) {
        clients.delete(clientId);
      }
    });
  });
});
