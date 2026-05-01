const { Server } = require('socket.io');

function wrapSession(sessionMiddleware) {
  return (socket, next) => {
    sessionMiddleware(socket.request, {}, next);
  };
}

function registerSocketHandlers(server, sessionMiddleware, env) {
  const io = new Server(server, {
    cors: {
      origin: env.SOCKET_CORS_ORIGIN,
      credentials: true
    }
  });

  io.use(wrapSession(sessionMiddleware));

  io.on('connection', (socket) => {
    const session = socket.request.session;
    const user = session && session.user ? session.user : null;

    socket.emit('server:welcome', {
      message: `Connected to ${env.APP_NAME}`,
      socketId: socket.id,
      user
    });

    socket.on('client:ping', (payload = {}) => {
      socket.emit('server:pong', {
        receivedAt: new Date().toISOString(),
        payload
      });
    });

    socket.on('chat:message', (payload = {}) => {
      const message = {
        id: Date.now(),
        user: user ? user.email : 'guest',
        text: payload.text || '',
        sentAt: new Date().toISOString()
      };

      io.emit('chat:message', message);
    });

    socket.on('notify:admin', (payload = {}) => {
      io.emit('notify:admin', {
        source: user ? user.email : 'guest',
        text: payload.text || 'New realtime event',
        sentAt: new Date().toISOString()
      });
    });
  });

  return io;
}

module.exports = registerSocketHandlers;
