const express = require('express');
const next = require('next');
const http = require('http');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // Game State store (in-memory for MVP)
  const rooms = {};

  io.on('connection', (socket) => {
    console.log('🔌 Client connected:', socket.id);

    socket.on('join-room', ({ roomId, user }) => {
      socket.join(roomId);

      if (!rooms[roomId]) {
        rooms[roomId] = {
          id: roomId,
          users: [],
          gameState: 'lobby', // lobby, round-1, round-2, etc.
          currentRound: 0
        };
      }

      // Add user to room state if not exists
      const existingUser = rooms[roomId].users.find(u => u.id === user.id);
      if (!existingUser) {
        rooms[roomId].users.push({ ...user, socketId: socket.id, score: 0 });
      }

      console.log(`👤 ${user.name} joined room ${roomId}`);
      io.to(roomId).emit('update-room-state', rooms[roomId]);
    });

    socket.on('start-game', (roomId) => {
      if (rooms[roomId]) {
        rooms[roomId].gameState = 'playing';
        rooms[roomId].currentRound = 1; // Start with round 1
        io.to(roomId).emit('update-room-state', rooms[roomId]);
        io.to(roomId).emit('game-started');
      }
    });

    socket.on('send-message', ({ roomId, message, user }) => {
      io.to(roomId).emit('receive-message', { user, message, timestamp: new Date() });
    });

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected:', socket.id);
      // Clean up user from rooms (optional for MVP but good practice)
    });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> 🚀 Ready on http://localhost:${PORT}`);
  });
});
