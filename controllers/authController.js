const { User } = require('../models');
const bcrypt = require('bcrypt');





module.exports = {


    async register(req, res) {
        try {
            let { name, email, password, passwordConfirmation } = req.body;

            if (!name || !email || !password) {
                req.flash('error', "name, email, and password required");
                return res.redirect('/register')
            }
            if (password !== passwordConfirmation) {
                req.flash('error', "passwords don't match");
                return res.redirect('/register')
            }
            if (password.length < 8) {
                req.flash('error',"password needes to be more than 8 characters");  
                 return res.redirect('/register')
                 
            }

            const existing = await User.findOne({ where: { email: email } });

            if (existing) {
                 req.flash('error',"email already registered");  
                 return res.redirect('/register')
            }


            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            let user = await User.create({ name: name, email: email, password: hash });

            req.session.user = { id: user.id, name: user.name, email: user.email };
            req.session.isLoggedIn = true

            
           return  res.render('../views/dashboard', { name: user.name })
        } catch (error) {
            console.log(error);
            req.flash("error",error);
             return res.redirect('/register')
        }



    },


    async login(req, res) {

        try {

            let { email, password } = req.body;

            if (!email || !password) {
                throw new Error("email and password required");
            }

            let user = await User.findOne({ where: { email: email } });
            if (!user) {
                throw new Error("email is not in our system");
            }



            const isRight = await bcrypt.compare(password, user.password);

            if (!isRight) {
                throw new Error("password or email incorrect");
            }



            req.session.user = { id: user.id, name: user.name, email: user.email }
            req.session.isLoggedIn = true;
            console.log(user)
            res.render('../views/dashboard', { name: user.name })

        } catch (error) {
            console.log(error);
            res.send('something went wrong')
        }

    },


    async logout(req, res) {
        try {

            req.session.user = {};
            req.session.isLoggedIn = false;
        } catch (error) {
            console.Error(Error);
            res.send('something went wrong')
        }
    }


}