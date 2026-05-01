const express = require('express');
const { ensureAdmin } = require('../middleware/auth');

function createAdminRouter() {
  const router = express.Router();

  router.use(ensureAdmin);

  router.get('/dashboard', (req, res) => {
    res.render('pages/admin/dashboard', {
      pageTitle: 'Admin Dashboard',
      stats: [
        { label: 'Active orders', value: 12 },
        { label: 'Open tickets', value: 4 },
        { label: 'Users online', value: 27 }
      ],
      recentUsers: [
        { name: 'Darkside_TH', email: 'darkside@example.com', role: 'customer' },
        { name: 'NeonGamer', email: 'neon@example.com', role: 'customer' },
        { name: 'SakuraChii', email: 'sakura@example.com', role: 'customer' }
      ]
    });
  });

  router.get('/users', (req, res) => {
    res.render('pages/admin/users', {
      pageTitle: 'Admin Users',
      users: [
        { name: 'Administrator', email: 'admin@example.com', role: 'admin' },
        { name: 'Darkside_TH', email: 'darkside@example.com', role: 'customer' },
        { name: 'NeonGamer', email: 'neon@example.com', role: 'customer' }
      ]
    });
  });

  return router;
}

module.exports = createAdminRouter;
