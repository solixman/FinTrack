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


    async update(req, res) {
        try {
            const { name, email, phoneNumber, address, dateOfBirth, bio, preferences, currency,avatar } = req.body;

            let user = await User.findByPk(req.session.user.id);
            user.name = name
            user.email = email
            user.phoneNumber = phoneNumber
            user.address = address
            user.dateOfBirth = dateOfBirth || null
            user.bio = bio;
            user.preferences = preferences;
            user.currency = currency;
            user.avatar = avatar;
            
           await user.save();

            req.flash('message', 'Profile updated successfully');
            res.redirect('/user/profile');

        } catch (error) {
            console.error(error);
            req.flash('error', 'Something went wrong');
            res.redirect('/user/profile');
        }
    }


}