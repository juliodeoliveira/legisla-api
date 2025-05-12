const express = require('express')
const app = express()
const { sequelize } = require('./models')
const cookieParser = require('cookie-parser')
require('dotenv').config()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())

app.set('view engine', 'ejs')

app.use('/', require('./routes/web'))
app.use('/', require('./routes/user'))

const PORT = process.env.PORT || 3000
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`))
})
