const express = require('express');
const { findUserById } = require('../services/user-service');

function createApiRouter({ env, pool }) {
  const router = express.Router();

  router.get('/health', async (req, res) => {
    try {
      await pool.query('SELECT 1 AS ok');
      res.json({
        ok: true,
        app: env.APP_NAME,
        database: 'connected',
        realtime: true,
        sessionUser: req.session.user || null
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        app: env.APP_NAME,
        database: 'disconnected',
        error: error.message
      });
    }
  });

  router.get('/session', (req, res) => {
    res.json({
      ok: true,
      sessionID: req.sessionID,
      user: req.session.user || null
    });
  });

  router.get('/me', async (req, res, next) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({
          ok: false,
          message: 'Unauthenticated.'
        });
      }

      const user = await findUserById(pool, req.session.user.id);
      return res.json({
        ok: true,
        user
      });
    } catch (error) {
      return next(error);
    }
  });

  return router;
}

module.exports = createApiRouter;
