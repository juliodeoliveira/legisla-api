const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class authController
{
    async register (req, res) {
        const { name, email, password } = req.body;
        const error = req.session.error || null;
        
        try {
            const user = await User.create({ name, email, password });
            res.redirect('/login');
        } catch (err) {
            console.error(err);
            req.session.error = "Email já cadastrado e/ou caracteres inválidos";
            res.redirect("/register");
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                req.session.error = 'Credenciais inválidas';
                return res.redirect("/login");
            }
            
            const passwordMatch = await bcrypt.compare(password, user.password);
            
            if (passwordMatch) {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.cookie('token', token).redirect('/dashboard');
            } else {
                req.session.error = 'Credenciais inválidas';
                return res.redirect("/login");
            }
    
        } catch (err) {
            console.error(err);
            req.session.error = 'Erro ao logar usuário';
            return res.redirect("/login");
        }
    }

    logout(req, res) {
        res.clearCookie('token'); 
        res.redirect('/login');
    }
}

module.exports = new authController();