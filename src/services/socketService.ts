import { Server } from 'socket.io';
import redisAdapter from 'socket.io-redis';
import { createAdapter } from 'socket.io-redis';
import Redis from 'ioredis';
import { RedisConfig } from './configs';

export class SocketService {
  private io: Server;
  private redis: Redis;

  constructor(server: any) {
    this.io = new Server(server, {
      adapter: createAdapter('redis://localhost:6379'), // Replace with your Redis server configuration
    });

    // Redis client setup
    this.redis = new Redis({ host: 'localhost', port: 6379 })

    const redisConfig = new RedisConfig();
    redisConfig.consume("layout", async (message: string) => {
      console.log("📨 Received message:", message);
      this.io.emit('layout', message);
    });

    this.io.on('connection', (socket) => {
      console.log('User connected');

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
      // Handle incoming chat messages
      socket.on('chat message', async (msg) => {

        try {
          // Store the chat message in Redis as a chat log
          await this.redis.lpush('chatLogs', msg);
          console.log('Message stored in Redis');
        } catch (error) {
          console.error('Error storing message in Redis:', error);
        }
        // Retrieve the chat message in Redis
        const messages = await this.redis.lrange('chatLogs', 0, -1);

        // Emit the message to all connected clients
        this.io.emit('messages', messages);

      });
      // Handle incoming chat messages
      socket.on('set layout', async (msg) => {
        console.log('set layout: ' + msg);
        // try {
          // Store the chat message in Redis as a chat log
          // await this.redis.set('layout', msg);
        const redisConfig = new RedisConfig();
        redisConfig.produce("layout", msg);
        console.log('Message stored in Redis');
        // } catch (error) {
        //   console.error('Error storing message in Redis:', error);
        // }
        // // Retrieve the chat message in Redis
        // const layout = await redis.get('layout');

        // // Emit the message to all connected clients
        // this.io.emit('layout', layout);

      });
    });
  }


}