const { render } = require('ejs');
const { User } = require('../models');
const userService = require('../services/userService');

module.exports = {



    async renderDashboard(req, res) {

        try {

            const user= await User.findByPk(req.session.user.id);
            
            const data = await userService.getData(user.id);

            const dashboardHTML = await require('ejs').renderFile(__dirname + '/../views/pages/dashboard.ejs', {
                data
            });


            res.render('../views/index.ejs', {
                error: req.flash('error'),
                message: req.flash('message'),
                title: 'dashboard',
                user,
                body: dashboardHTML
            });

            return;
        } catch (error) {
            console.log(error);
            return res.send('something went wrong')
        }
    },
}