const express = require('express');
const createPublicRouter = require('./public');
const createAuthRouter = require('./auth');
const createUserRouter = require('./user');
const createAdminRouter = require('./admin');

function createWebRouter({ env, pool }) {
  const router = express.Router();

  router.get('/dashboard', (req, res) => {
    if (!req.session.user) {
      req.session.flash = {
        type: 'error',
        message: 'Please login before accessing that page.'
      };
      return res.redirect('/login');
    }

    return res.redirect(req.session.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
  });

  router.use('/', createPublicRouter());
  router.use('/', createAuthRouter({ pool, env }));
  router.use('/user', createUserRouter());
  router.use('/admin', createAdminRouter());

  return router;
}

module.exports = createWebRouter;
