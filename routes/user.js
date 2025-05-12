const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { Document } = require("../models")
const authToken = require('../middleware/auth');
const router = express.Router();

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao registrar usuário');
  }
});

router.post('/login-user', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("usuario nao encontrado")
      return res.status(401).send('Credenciais inválidas');
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (passwordMatch) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.cookie('token', token).redirect('/dashboard');
    } else {
      console.log("senha nao bate")
      return res.status(401).send('Credenciais inválidas');
    }

  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao fazer login');
  }
});

router.get('/dashboard', authToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.render('dashboard', { user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao carregar o dashboard');
  }
});

router.get('/meus-documentos', authToken, async (req, res) => {
  try {
    const documents = await Document.findAll({
      where: { user_id: req.user.id },
    });

    res.render('meus-documentos', { documents });

  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao carregar documentos');
  }
});

module.exports = router;
