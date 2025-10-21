const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(PORT, () => {
    console.log(`SErver running on http://localhost:${PORT}`);
    console.log(`Websocket chat app ready`);
});

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Store connected clients
const clients = new Set();

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('New client connected');
  clients.add(ws);
  
  // Send welcome message to new client
  ws.send(JSON.stringify({
    type: 'system',
    message: 'Welcome to WebSocket Chat!',
    timestamp: new Date().toISOString(),
    userCount: clients.size
  }));
  
  // Broadcast to all clients that someone joined
  broadcast({
    type: 'system',
    message: 'A new user joined the chat',
    timestamp: new Date().toISOString(),
    userCount: clients.size
  }, ws);
  
  // Handle messages from this client
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      console.log('Received:', message);
      
      // Broadcast message to all clients
      broadcast({
        type: 'chat',
        username: message.username,
        message: message.message,
        timestamp: new Date().toISOString()
      }, ws);
      
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });
  
  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
    
    // Broadcast to all clients that someone left
    broadcast({
      type: 'system',
      message: 'A user left the chat',
      timestamp: new Date().toISOString(),
      userCount: clients.size
    }, ws);
  });
  
  // Handle errors
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

// Function to broadcast messages to all clients
function broadcast(data, excludeWs = null) {
  const message = JSON.stringify(data);
  clients.forEach(client => {
    if (client !== excludeWs && client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Basic HTTP route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});