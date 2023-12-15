# Chatroom Backend

This project is a chatroom backend built with Express, Socket.IO, and Redis.

## Project Structure

```
chatroom-backend
├── src
│   ├── app.ts
│   ├── controllers
│   │   └── chatController.ts
│   ├── routes
│   │   └── chatRoutes.ts
│   ├── services
│   │   ├── socketService.ts
│   │   └── redisService.ts
│   └── types
│       └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Files

- `src/app.ts`: Entry point of the application. Sets up the express server, socket.io, and routes. Connects to the Redis server.
- `src/controllers/chatController.ts`: Exports a class `ChatController` which has methods for handling chat-related actions like sending and receiving messages.
- `src/routes/chatRoutes.ts`: Exports a function `setChatRoutes` which sets up the routes for the chat application. Uses the `ChatController` to handle these routes.
- `src/services/socketService.ts`: Exports a class `SocketService` which sets up and handles socket.io events.
- `src/services/redisService.ts`: Exports a class `RedisService` which handles interactions with the Redis server.
- `src/types/index.ts`: Exports any custom types used in the project.
- `tsconfig.json`: Configuration file for TypeScript. Specifies the compiler options and the files to include in the compilation.
- `package.json`: Configuration file for npm. Lists the dependencies and scripts for the project.

## Setup

To set up the project, follow these steps:

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Start the Redis server.
4. Run `npm start` to start the application.

## Usage

The application provides a chatroom service. Users can send and receive messages in real-time. The messages are stored in a Redis server.