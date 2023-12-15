import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { setChatRoutes } from './routes/chatRoutes';
// import { RedisService } from './services/redisService';
import { SocketService } from './services/socketService';

const app = express();
const server = createServer(app);
// const io = new Server(server);

// This line is important
app.use(express.json());

// Connect to Redis
// const redisService = new RedisService();
// redisService.connect();

// Set up routes
setChatRoutes(app);

//implement SocketService
const socketService = new SocketService(server);

// // Set up Socket.IO
// io.on('connection', (socket) => {
//   console.log('a user connected');

//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//     io.emit('chat message', msg);
//   });
  
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});