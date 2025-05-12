const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.redirect('/register'));

module.exports = router;
