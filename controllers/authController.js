const { User } = require('../models');
const bcrypt = require('bcrypt');





module.exports = {


    async register(req, res) {
        try {
            let { name, email, password, passwordConfirmation } = req.body;

            if (!name || !email || !password) {
                throw new error("name, email, and password required");
            }
            if (password !== passwordConfirmation) {
                throw new error("passwords are not the same");
            }
            if (password.length < 8) {
                throw new error("Password must be at least 8 characters");
            }

            const existing = await User.findOne({ where: { email: email } });

            if (existing) {
                throw new error('email already exists');
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

    
    async login (req,res){
        
        
        let {email,password}=req.body;
        
        if(!email || !password){
            throw new Error("email and password required");
        }
        
        const user=  User.findOne({where:{email:email}});
        if(!user){
            throw new error("email");
        }
        
        isRight= await bcrypt.compare(password,user.password);
        
        console.log(isRight);
        
        
        res.send('logging in');
        
    } 
    
    

}