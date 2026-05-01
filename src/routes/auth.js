const express = require('express');
const createAuthController = require('../controllers/auth-controller');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

function createAuthRouter({ pool, env }) {
  const router = express.Router();
  const authController = createAuthController({ pool, env });

  router.get('/login', ensureGuest, (req, res) => {
    res.render('pages/login', {
      pageTitle: 'Login'
    });
  });

  router.post('/login', ensureGuest, authController.login);

  router.get('/register', ensureGuest, (req, res) => {
    res.render('pages/register', {
      pageTitle: 'Register'
    });
  });

  router.post('/register', ensureGuest, authController.register);

  router.post('/logout', ensureAuth, authController.logout);

  return router;
}

module.exports = createAuthRouter;
