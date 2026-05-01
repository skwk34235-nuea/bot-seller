const { hashPassword, comparePassword } = require('../utils/password');

async function createUser(pool, payload) {
  const { name, email, password } = payload;
  const passwordHash = hashPassword(password);

  const [result] = await pool.execute(
    'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
    [name, email, passwordHash, 'customer']
  );

  return {
    id: result.insertId,
    name,
    email,
    role: 'customer'
  };
}

async function findUserByEmail(pool, email) {
  const [rows] = await pool.execute(
    'SELECT id, name, email, password_hash, role, created_at FROM users WHERE email = ? LIMIT 1',
    [email]
  );

  return rows[0] || null;
}

async function findUserById(pool, id) {
  const [rows] = await pool.execute(
    'SELECT id, name, email, role, created_at FROM users WHERE id = ? LIMIT 1',
    [id]
  );

  return rows[0] || null;
}

async function authenticateUser(pool, email, password) {
  const user = await findUserByEmail(pool, email);

  if (!user || !comparePassword(password, user.password_hash)) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.created_at
  };
}

function createSessionUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.created_at || user.createdAt || new Date().toISOString()
  };
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  authenticateUser,
  createSessionUser
};
