const express = require('express');
const { products, plans, reviews, faqs } = require('../data/store');

function createPublicRouter() {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.render('pages/home', {
      pageTitle: 'Home',
      products,
      plans
    });
  });

  router.get('/products', (req, res) => {
    res.render('pages/products', {
      pageTitle: 'Products',
      products
    });
  });

  router.get('/plans', (req, res) => {
    res.render('pages/plans', {
      pageTitle: 'Plans',
      plans
    });
  });

  router.get('/reviews', (req, res) => {
    res.render('pages/reviews', {
      pageTitle: 'Reviews',
      reviews
    });
  });

  router.get('/faq', (req, res) => {
    res.render('pages/faq', {
      pageTitle: 'FAQ',
      faqs
    });
  });

  router.get('/contact', (req, res) => {
    res.render('pages/contact', {
      pageTitle: 'Contact'
    });
  });

  return router;
}

module.exports = createPublicRouter;
