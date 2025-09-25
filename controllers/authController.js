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


            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    console.log('salt error', err);
                    return;
                }
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        console.log('in hash error:', err);
                        return
                    }
                 let user =  User.create({ name: name, email: email, password: hash });
                })


            })

            res.send('working so far');

        } catch (error) {
            console.error(error);
            res.send('what now')

        }



    },



}