const jwt = require('jsonwebtoken');

function authToken (req, res, next) {
  // const token = req.headers['authorization'];
  // if (!token) return res.status(401).json({ error: 'Token ausente' });

  // try {
  //   const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
  //   req.userId = decoded.id;
  //   next();
  // } catch (err) {
  //   res.status(401).json({ error: 'Token inválido' });
  // }

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send('Acesso negado. Token não fornecido.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // você terá acesso ao ID do usuário, etc.
    next();
  } catch (err) {
    return res.status(403).send('Token inválido.');
  }
};

module.exports = authToken;