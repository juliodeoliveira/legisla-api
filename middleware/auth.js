const jwt = require('jsonwebtoken');

function authToken (req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    req.session.error = "Token inválido";
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    req.session.error = "Token inválido";
    return res.redirect("/login");
  }
};

module.exports = authToken;