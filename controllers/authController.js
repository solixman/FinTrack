const { User } = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;





module.exports = {


    async register(req, res) {
        try {
            let { name, email, password, passwordConfirmation } = req.body;

            if (!name || !email || !password) {
                return res.json({ message: 'name, email, and password required' });
            }
            if (password !== passwordConfirmation) {
                return res.json({ message: 'passwords are not the same' });
            }
            if (password.length < 8) {
                return res.status(400).json({ message: 'Password must be at least 8 characters' });
            }

            const existing = await User.findOne({ where: { email: email } });

            if (existing) {
                return res.status(400).json({ message: 'email already exists' });
            }


            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            let user = await User.create({ name: name, email: email, password: hash });

            req.session.user = user;
            req.session.isLoggedIn = true

              console.log(user);
            res.send('registered and logged in');

        } catch (error) {
            console.error(error);
            res.send('what now')

        }



    },



}