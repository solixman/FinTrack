const { User, Transaction } = require('../models')

module.exports = {


 async   create(req, res) {
           
        try {
           let user=req.session.user;
        
            const { amount, type, categoryId, date, note } = req.body;

            if (!amount, !type, !categoryId) {
                req.flash('error', "amount, type, category and Date are all needed");
                return res.redirect('back');
            }
            
           
            
            if(!note){
                const note = "no note available";
            }
            
        //    return res.send({ amount:amount,date:date,type:type,categoryId:categoryId})

         await Transaction.create({ userId:user.id, amount:amount,date:date,type:type,categoryId:categoryId})

            res.send('hiiiii');
        } catch (error) {
            req.flash('error', 'something went wrong');
            console.log(error);
            return res.redirect(req.get('referer') || '/dashboard');
        }

    

    }


}