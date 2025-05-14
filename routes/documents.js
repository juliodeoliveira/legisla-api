
const express = require('express');
const router = express.Router();
const { Document } = require("../models")
const authToken = require('../middleware/auth');

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


// TODO: Mover para arquivo que tenha apenas rotas documents
router.post("/add-document", authToken, async (req, res) => {
  const { title, content } = req.body;
  try {
    const user_id = req.user.id;
    // TODO: Nunca confie no que vem do front end
    // TODO: Passar para o controller as funcoes e só chamar elas aqui
    const document = await Document.create({ title, content, user_id });
    res.redirect("/meus-documentos");
  } catch (error) {
    console.log(error);
  }
});

router.post("/delete-document/:id", authToken, async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  await Document.destroy({ where: { id, user_id }})
  res.redirect("/meus-documentos");
})

module.exports = router;