const {User,Transaction}=require('../models')


module.exports={


    create(req,res) {


        const { amount,type,categoryId,date,note}=req.body;

    console.log(amount,type,categoryId,date,note)



        res.send('hiiiii');

    }


}