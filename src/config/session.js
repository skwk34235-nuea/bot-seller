const session = require('express-session');
const MySQLStoreFactory = require('express-mysql-session');

function createSessionMiddleware(env) {
  const MySQLStore = MySQLStoreFactory(session);
  const sessionStore = new MySQLStore({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: env.SESSION_MAX_AGE,
    createDatabaseTable: true,
    schema: {
      tableName: 'user_sessions',
      columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data'
      }
    }
  });

  const sessionMiddleware = session({
    key: env.SESSION_NAME,
    secret: env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      httpOnly: true,
      maxAge: env.SESSION_MAX_AGE,
      sameSite: 'lax',
      secure: env.NODE_ENV === 'production'
    }
  });

  return { sessionMiddleware, sessionStore };
}

module.exports = createSessionMiddleware;
