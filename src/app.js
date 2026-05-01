const path = require('path');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const env = require('./config/env');
const { pool } = require('./config/database');
const createSessionMiddleware = require('./config/session');
const createWebRouter = require('./routes/web');
const createApiRouter = require('./routes/api');

function createApp() {
  const app = express();
  const { sessionMiddleware } = createSessionMiddleware(env);

  app.set('view engine', 'ejs');
  app.set('views', path.join(process.cwd(), 'views'));

  app.use(helmet({
    contentSecurityPolicy: false
  }));
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(sessionMiddleware);
  app.use(express.static(path.join(process.cwd(), 'public')));

  app.use((req, res, next) => {
    res.locals.appName = env.APP_NAME;
    res.locals.currentPath = req.path;
    res.locals.sessionUser = req.session.user || null;
    res.locals.isAdminArea = req.path.startsWith('/admin');
    res.locals.isUserArea = req.path.startsWith('/user');
    res.locals.flash = req.session.flash || null;
    delete req.session.flash;
    next();
  });

  app.use('/', createWebRouter({ env, pool }));
  app.use('/api', createApiRouter({ env, pool }));

  app.use((req, res) => {
    res.status(404).render('pages/faq', {
      pageTitle: 'Page Not Found',
      faqs: [{
        question: 'Route not found',
        answer: 'The page you requested does not exist in the current router setup.'
      }]
    });
  });

  app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: 'Internal server error.',
      error: env.NODE_ENV === 'development' ? error.message : undefined
    });
  });

  return { app, sessionMiddleware, env };
}

module.exports = createApp;
