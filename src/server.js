const httpHandler = require('./httpHandler');
const ioHandler = require('./ioHandler');

const PORT = process.env.PORT || process.env.NODE_PORT || 3000;

// Create HTTP server. Handles HTTP requests.
const server = httpHandler.CreateServer(PORT);

// Set IO Handler to listen to the server.
ioHandler.CreateIO(server, (socket) => {
  // Handles when a message is received from a socket.
  socket.on('draw', (data) => {
    // Send image to others
    socket.broadcast.emit('draw', data); // Send red shapes to everyone excepts the sender.

    // Send confirmation message.
    socket.emit('serverMessage', { message: 'Shape Updated' });  // Sends confirmation message to server.
  });
});
