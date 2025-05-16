const { User } = require('../models');

exports.showDashboard = async (req, res) => {
   try {
      const user = await User.findByPk(req.user.id);
      res.render('dashboard', { user });
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao carregar o dashboard');
    }
};
