import { Server } from 'socket.io';
import redisAdapter from 'socket.io-redis';
import { createAdapter } from 'socket.io-redis';
import Redis from 'ioredis';

export class SocketService {
  private io: Server;

  constructor(server: any) {
    this.io = new Server(server, {
      adapter: createAdapter('redis://localhost:6379'), // Replace with your Redis server configuration
    });

    // Redis client setup
    const redis = new Redis({ host: 'localhost', port: 6379 })

    this.io.on('connection', (socket) => {
      console.log('User connected');

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
      // Handle incoming chat messages
      socket.on('chat message', async (msg) => {

        try {
          // Store the chat message in Redis as a chat log
          await redis.lpush('chatLogs', msg);
          console.log('Message stored in Redis');
        } catch (error) {
          console.error('Error storing message in Redis:', error);
        }
        // Retrieve the chat message in Redis
        const messages = await redis.lrange('chatLogs', 0, -1);

        // Emit the message to all connected clients
        this.io.emit('messages', messages);

      });
      // Handle incoming chat messages
      socket.on('set layout', async (msg) => {

        try {
          // Store the chat message in Redis as a chat log
          await redis.set('layout', msg);
          console.log('Message stored in Redis');
        } catch (error) {
          console.error('Error storing message in Redis:', error);
        }
        // Retrieve the chat message in Redis
        const layout = await redis.get('layout');

        // Emit the message to all connected clients
        this.io.emit('layout', layout);

      });
    });
  }
}