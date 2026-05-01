const express = require('express');
const { ensureUser } = require('../middleware/auth');
const { products } = require('../data/store');

function createUserRouter() {
  const router = express.Router();

  router.use(ensureUser);

  router.get('/dashboard', (req, res) => {
    res.render('pages/user/dashboard', {
      pageTitle: 'User Dashboard',
      featuredProducts: products.slice(0, 3),
      orders: [
        { code: 'ORD-1001', item: 'Melody Bot', status: 'Pending', updatedAt: 'Today' },
        { code: 'ORD-1002', item: 'Guardian Shield', status: 'In Review', updatedAt: '5 minutes ago' }
      ]
    });
  });

  router.get('/profile', (req, res) => {
    res.render('pages/user/profile', {
      pageTitle: 'User Profile'
    });
  });

  return router;
}

module.exports = createUserRouter;
