
const express = require('express');
const router = express.Router();
const authToken = require('../middleware/auth');
const { body } = require("express-validator");
const documentController = require("../controllers/DocumentController");

router.get('/meus-documentos', authToken, documentController.showDocuments);

router.post("/add-document", authToken, [
        body('title').trim().isLength({ min: 3 }).escape(),
        body('content').trim().isLength({ min: 10 }).escape()
    ], documentController.addDocument);

router.post("/delete-document/:id", authToken, documentController.deleteDocument);

router.get('/edit-document/:id', authToken, documentController.showEditPage);

router.post('/edit-document/:id', authToken, [
        body('title').trim().isLength({ min: 3 }).escape(),
        body('content').trim().isLength({ min: 10 }).escape()
    ], documentController.editDocument);


module.exports = router;