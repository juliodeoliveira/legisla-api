const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.get('/perfil', authMiddleware, (req, res) => {
  res.json({ message: `Bem-vindo, usuário ID ${req.userId}` });
});

module.exports = router;
