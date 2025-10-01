const { User } = require('../models');


module.exports = {


    async Profile(req, res) {

        try {
            let user = await User.findByPk(req.session.user.id);

            const profileHTML = await require('ejs').renderFile(__dirname + '/../views/pages/profile.ejs', {
                user
            });

            return res.render('../views/index.ejs', {
                error: req.flash('error'),
                message: req.flash('message'),
                title: 'Profile',
                user,
                body: profileHTML
            });


        } catch (error) {
            req.flash('error', "something went wrong");
            console.log(error);
            return res.redirect(req.get('referer') || '/dashboard');
        }
    },


   
}