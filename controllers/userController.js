const { User } = require('../models');
const bcrypt = require('bcrypt');
const UserService=require('../services/userService');

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
            const { name, email, phoneNumber, address, dateOfBirth, bio, preferences, currency, avatar } = req.body;

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
    },

    async changePassword(req, res) {
        try {
            const { confirmPassword, newPassword, oldPassword } = req.body;
            let user = await User.findByPk(req.session.user.id)
            
            const isRight = await bcrypt.compare(oldPassword, user.password);
            if (!isRight) {
                req.flash('error', "wrong password");
                return res.redirect(req.get('referer') || '/user/profile');
            }
            
            if (confirmPassword !== newPassword) {
                req.flash('error', "new passwords don't match");
                return res.redirect(req.get('referer') || '/user/profile');
            }
            
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
            await user.save();
            req.flash('message', "password reintialized succesfully ");
            return res.redirect(req.get('referer') || '/user/profile');
            
        } catch (error) {
             req.flash('error', "something went wrong");
            return res.redirect(req.get('referer') || '/user/profile');
        }


    },


    async generateRepport(req,res){
        try {
            let data= await UserService.getData(req.session.user.id);

            console.log('data is '+data);
            return res.render('../views/report/report.ejs',{data:data});
            

        } catch (error) {
            req.flash("error",'something went wrong')
            console.log(error);
            return res.redirect(req.get('referer') || '/user/profile');
        }
    }


}