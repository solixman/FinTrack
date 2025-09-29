const { User, Transaction } = require('../models')

module.exports = {



    async index(req,res) {
        
        const user = await User.findByPk(req.session.user.id);
        const transactions = await Transaction.findAll( {where:{
          id:user.id,}})


        const transactionsHTML =await require(ejs).renderFile(__dirname,'/../views/pages/transactions.ejs',{
            user,
            transactions
        })

            res.render('../views/index.ejs', {
                error: req.flash('error'),
                message: req.flash('message'),
                title: 'dashboard',
                user,
                body: transactionsHTML
            });

    },



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

            Transaction.destroy({
                where: {
                    id: id
                }
            });

            req.flash('message', "transaction updated successfully");
            return res.redirect(req.get('referer') || '/dashboard');
        } catch (error) {
            req.flash('error', "something went wrong");
            console.log(error);
            return res.redirect(req.get('referer') || '/dashboard');
        }

    },

    async update(req, res) {


        try {

            const { amount, type, categoryId, date, note } = req.body;


            const id = req.params.id;
            let transaction = await Transaction.findByPk(id);
            if (!transaction) {
                req.flash('message', "transaction doesn't exist");
                return res.redirect(req.get('referer') || '/dashboard');
            }

            transaction.amount = amount;
            transaction.type = type;
            transaction.categoryId = categoryId;
            transaction.date = date;
            transaction.note = note;
            await transaction.save();
            req.flash('message', "transaction updated successfully");
            return res.redirect(req.get('referer') || '/dashboard');
        } catch (error) {
            req.flash('error', "something went wrong");
            console.log(error);
            return res.redirect(req.get('referer') || '/dashboard');
        }
    }
}