const jwt = require('jsonwebtoken');

function authToken (req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send('Acesso negado. Token não fornecido.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).send('Token inválido.');
  }
};

module.exports = authToken;