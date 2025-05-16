const { Document } = require("../models")
const { validationResult } = require("express-validator");

class DocumentController
{
    async showDocuments(req, res) {
        const error = req.session.error || null;
        req.session.error = null;

        try {
            const documents = await Document.findAll({
                where: { user_id: req.user.id },
            });
    
            res.render('meus-documentos', { documents, error });
    
        } catch (err) {
            console.error(err);
            res.status(500).send('Erro ao carregar documentos');
        }
    }

    async addDocument(req, res) {
        const { title, content } = req.body;
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.error = "Título ou conteúdo inválido";
            return res.redirect("/meus-documentos");
        }
    
        try {
            const user_id = req.user.id;
            const document = await Document.create({ title, content, user_id });
            res.redirect("/meus-documentos");
        } catch (error) {
            console.log(error);
        }
    }

    async deleteDocument(req, res)  {
        const { id } = req.params;
        const user_id = req.user.id;

        await Document.destroy({ where: { id, user_id }})
        res.redirect("/meus-documentos");
    }

    async showEditPage(req, res) {
        const document = await Document.findByPk( req.params.id );
        if (!document || document.user_id !== req.user.id) {
            req.session.error = "Documento não encontrado ou acesso negado";
            return res.redirect('/meus-documentos');
        }
        res.render('edit-document', { document });
    }

    async editDocument(req, res) {
        const { title, content } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.error = "Título ou conteúdo inválido";
            return res.redirect("/meus-documentos");
        }

        const document = await Document.findByPk(req.params.id);

        if (!document || document.user_id !== req.user.id) {
            req.session.error = "Documento não encontrado ou acesso negado";
            return res.redirect('/meus-documentos');
        }

        await document.update({ title, content });
        res.redirect('/meus-documentos');
    }

}

module.exports = new DocumentController;