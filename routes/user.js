const express = require('express');
const authToken = require('../middleware/auth');
const router = express.Router();
const authController = require("../controllers/AuthController");
const { showDashboard } = require("../controllers/DashboardController");

router.get('/register', (req, res) => {
  const error = req.session.error || null;
  req.session.error = null; 
  res.render('register', { error });
});

router.get('/login', (req, res) => {
  const error = req.session.error || null;
  req.session.error = null;
  res.render('login', { error });
});

router.post('/register', authController.register);

router.post('/login-user', authController.login);

router.get("/logout", authController.logout);

router.get('/dashboard', authToken, showDashboard);

module.exports = router;
