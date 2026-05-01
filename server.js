const http = require('http');
const createApp = require('./src/app');
const registerSocketHandlers = require('./src/sockets');

const { app, sessionMiddleware, env } = createApp();
const server = http.createServer(app);

registerSocketHandlers(server, sessionMiddleware, env);

server.listen(env.PORT, () => {
  console.log(`${env.APP_NAME} listening on ${env.APP_URL}`);
});
