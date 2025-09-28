const { User, Transaction } = require('../models')

module.exports = {


    async create(req, res) {

        try {
            let user = req.session.user;

            const { amount, type, categoryId, date, note } = req.body;

            if (!amount, !type, !categoryId) {
                req.flash('error', "amount, type, category and Date are all needed");
                return res.redirect('back');
            }
            if (!note) {
                const note = "no note available";
            }

            await Transaction.create({ userId: user.id, amount: amount, date: date, type: type, categoryId: categoryId })

            req.flash('message', "transaction created succesfully");
            return res.redirect(req.get('referer') || '/dashboard');

        } catch (error) {

            req.flash('error', "something went wrong");
            console.log(error);
            return res.redirect(req.get('referer') || '/dashboard');
        }
    },



    async delete(req, res) {

        try {
          id = req.params.id;
            const id = req.body.id;
            
             Transaction.destroy({where:{
                id:id
             }});


    return res.send('deleted succesfully')
} catch (error) {

        }

    },


    

}
