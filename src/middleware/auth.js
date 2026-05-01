function ensureGuest(req, res, next) {
  if (req.session.user) {
    if (req.session.user.role === 'admin') {
      return res.redirect('/admin/dashboard');
    }

    return res.redirect('/user/dashboard');
  }

  return next();
}

function ensureAuth(req, res, next) {
  if (!req.session.user) {
    req.session.flash = {
      type: 'error',
      message: 'Please login before accessing that page.'
    };
    return res.redirect('/login');
  }

  return next();
}

function ensureAdmin(req, res, next) {
  if (!req.session.user) {
    req.session.flash = {
      type: 'error',
      message: 'Please login before accessing the admin area.'
    };
    return res.redirect('/login');
  }

  if (req.session.user.role !== 'admin') {
    req.session.flash = {
      type: 'error',
      message: 'You do not have permission to access the admin area.'
    };
    return res.redirect('/user/dashboard');
  }

  return next();
}

function ensureUser(req, res, next) {
  if (!req.session.user) {
    req.session.flash = {
      type: 'error',
      message: 'Please login before accessing your dashboard.'
    };
    return res.redirect('/login');
  }

  if (req.session.user.role === 'admin') {
    return res.redirect('/admin/dashboard');
  }

  return next();
}

module.exports = {
  ensureGuest,
  ensureAuth,
  ensureAdmin,
  ensureUser
};
