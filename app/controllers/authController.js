const user=require('../models/user');
const role=require('../models/role');
const bcrypt = require('bcrypt');

module.exports= {


    async register(req,res){
        console.log('here');
                res.send(req.body)



    },



}