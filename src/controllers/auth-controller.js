const { createUser, findUserByEmail, authenticateUser, createSessionUser } = require('../services/user-service');

function createAuthController({ pool, env }) {
  async function register(req, res, next) {
    try {
      const { name, email, password, confirmPassword } = req.body;

      if (!name || !email || !password) {
        req.session.flash = { type: 'error', message: 'Please fill in all required fields.' };
        return res.redirect('/register');
      }

      if (password !== confirmPassword) {
        req.session.flash = { type: 'error', message: 'Password confirmation does not match.' };
        return res.redirect('/register');
      }

      const existingUser = await findUserByEmail(pool, email);
      if (existingUser) {
        req.session.flash = { type: 'error', message: 'This email is already registered.' };
        return res.redirect('/register');
      }

      const user = await createUser(pool, { name, email, password });
      req.session.user = user;
      req.session.flash = { type: 'success', message: 'Registration completed successfully.' };
      return res.redirect('/user/dashboard');
    } catch (error) {
      return next(error);
    }
  }

  async function login(req, res, next) {
    try {
      const { email, password } = req.body;
      let user = null;

      if (email === env.ADMIN_EMAIL && password === env.ADMIN_PASSWORD) {
        user = createSessionUser({
          id: 0,
          name: 'Administrator',
          email: env.ADMIN_EMAIL,
          role: 'admin',
          createdAt: new Date().toISOString()
        });
      } else {
        user = await authenticateUser(pool, email, password);
      }

      if (!user) {
        req.session.flash = { type: 'error', message: 'Invalid email or password.' };
        return res.redirect('/login');
      }

      req.session.user = user;
      req.session.flash = { type: 'success', message: `Welcome back, ${user.name}.` };
      return res.redirect(user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
    } catch (error) {
      return next(error);
    }
  }

  function logout(req, res, next) {
    req.session.destroy((error) => {
      if (error) {
        return next(error);
      }

      res.clearCookie(env.SESSION_NAME);
      return res.redirect('/login');
    });
  }

  return {
    register,
    login,
    logout
  };
}

module.exports = createAuthController;
