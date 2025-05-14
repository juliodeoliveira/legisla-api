const express = require('express');
const session = require('express-session');
const app = express();
const { sequelize } = require('./models');
const cookieParser = require('cookie-parser');
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use('/', require('./routes/web'));
app.use('/', require('./routes/user'));
app.use('/', require('./routes/documents'));
app.use('/', require('./routes/auth.routes'));

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
});
