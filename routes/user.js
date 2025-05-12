const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { Document } = require("../models")
const authToken = require('../middleware/auth');
const router = express.Router();

// Página de cadastro
router.get('/register', (req, res) => {
  res.render('register');
});

// Página de login
router.get('/login', (req, res) => {
  res.render('login');
});

// Registro de usuário
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(req.body)
  try {
    const user = await User.create({ name, email, password });
    // console.log(user)
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao registrar usuário');
  }
});

// Login do usuário
router.post('/login-user', async (req, res) => {
    const { email, password } = req.body;
    
    try {

        // const testHash = await bcrypt.hash("julio", 10);
        // console.log(await bcrypt.compare("julio", testHash));
        
        // 1. Verificar se o usuário existe
        const user = await User.findOne({ where: { email } });
        // console.log(user)

        if (!user) {
            console.log("usuario nao encontrado")
            return res.status(401).send('Credenciais inválidas');
        }

        // 2. Comparar senhas

        // console.log(email)
        // console.log(password)
        
        const passwordMatch = await bcrypt.compare(password, user.password);

        // console.log('Senhas coincidem? que no caso é hard coded (julio)', passwordMatch);
        
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

router.get('/dashboard', authToken, (req, res) => {
  // Aqui você pode verificar o token e carregar os dados do usuário
  res.send('Dashboard do usuário (em construção)');
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
