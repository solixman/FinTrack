const { User } = require('../models');
const bcrypt = require('bcrypt');





module.exports = {


    async register(req, res) {
        try {
            let { name, email, password, passwordConfirmation } = req.body;

            if (!name || !email || !password) {
                throw new Error("name, email, and password required");
            }
            if (password !== passwordConfirmation) {
                throw new Error("passwords are not the same");
            }
            if (password.length < 8) {
                throw new Error("Password must be at least 8 characters");
            }

            const existing = await User.findOne({ where: { email: email } });

            if (existing) {
                throw new Error('email already exists');
            }


            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            let user = await User.create({ name: name, email: email, password: hash });

            req.session.user = {id:user.id,name:user.name,email:user.email};
            req.session.isLoggedIn = true

            res.send('registered and logged in');
            
        } catch (Error) {
            console.Error(Error);
            res.send('what now')

        }



    },

    
    async login (req,res){
    
        
        let {email,password}=req.body;
        
        if(!email || !password){
            throw new Error("email and password required");
        }
        
        let user= await  User.findOne({where:{email:email}});
        if(!user){
            throw new Error("email is not in our system");
        }
        
        
        
        const   isRight= await bcrypt.compare(password,user.password);
        
        if(!isRight){
        throw new Error("password or email incorrect");
        }
      
      

        req.session.user= {id:user.id,name:user.name,email:user.email}
        req.session.isLoggedIn=true;
        

        res.send('logging in');
        
    },
    



    async logout(req,res){

    req.session.user={};
    req.session.isLoggedIn=false;
    res.send('logged out succesfully');
}
    

}