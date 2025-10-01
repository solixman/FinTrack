const { Category, User, Transaction } = require('../models')

module.exports = {



    async index(req, res) {

        try {
            const user = await User.findByPk(req.session.user.id);
            const transactions = await this.getTransactions(user.id)
            const categories = await Category.findAll();
            const transactionsHTML = await require('ejs').renderFile(__dirname + '/../views/pages/transactions.ejs', {
                transactions,
                categories
            });

            return res.render('../views/index.ejs', {
                error: req.flash('error'),
                message: req.flash('message'),
                title: 'Transactions',
                user,
                body: transactionsHTML
            });

        } catch (error) {
            req.flash('error', "something went wrong");
            console.log(error);
            return res.redirect(req.get('referer') || '/dashboard');
        }
    },



    async create(req, res) {

        try {
            let user = await User.findByPk(req.session.user.id);

            let { amount, type, categoryId, date, note } = req.body;
            amount = parseFloat(amount);

            if (!amount, !type, !categoryId) {
                req.flash('error', "amount, type, category and Date are all needed");
                return res.redirect('back');
            }
            if (!note) {
                const note = "no note available";
            }
            if (type == 'income') {
                user.balance += amount;
            } else {
                user.balance -= amount;
            }

            user.save();

            await Transaction.create({ userId: user.id, amount: amount, date: date, type: type, categoryId: categoryId })

            req.flash('message', "transaction created succesfully");
            return res.redirect(req.get('referer') || '/transactions');

        } catch (error) {

            req.flash('error', "something went wrong");
            console.log(error);
            return res.redirect(req.get('referer') || '/transactions');
        }
    },



    async delete(req, res) {

        try {

            const id = req.params.id;
            
            if (req.body.mode === 'undo') {
                
                let user = await User.findByPk(req.session.user.id);
                let transaction =await Transaction.findByPk(id);
                
                if (transaction.type === "income") {
                    user.balance -= transaction.amount;
                } else {
                    user.balance += transaction.amount;
                }
         
               await user.save();
            }
            Transaction.destroy({
                where: {
                    id: id
                }
            });

            req.flash('message', "transaction deleted successfully");
            return res.redirect(req.get('referer') || '/transactions');
        } catch (error) {
            req.flash('error', "something went wrong");
            console.log(error);
            return res.redirect(req.get('referer') || '/transactions');
        }

    },

    async update(req, res) {

        try {
            let { amount, type, categoryId, date, note } = req.body;
            amount = parseFloat(amount);

            const id = req.params.id;

            let transaction = await Transaction.findByPk(id);
            if (!transaction) {
                req.flash('message', "transaction doesn't exist");
                return res.redirect(req.get('referer') || '/dashboard');
            }

            if (type !== transaction.type || amount !== amount.type) {
                await this.handelUserbalance(req.session.user.id, transaction, amount, type);
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
    },


    async getTransactions(id, limit = 'undefined') {
        try {

            if (limit = 'undefined') {

                return await Transaction.findAll({
                    where: { userId: id },
                    order: [['createdAt', 'DESC']],
                });
            } else {
                return await Transaction.findAll({
                    where: { userId: id },
                    order: [['createdAt', 'DESC']],
                    limit: 5
                });
            }

        } catch (error) {
            console.error(error);
            throw new Error('Error fetching transactions');
        }

    },

    async handelUserbalance(id, transaction, amount, type) {

        let user = await User.findByPk(id);
        if (transaction.type !== type) {

            if (transaction.type === "income") {
                user.balance -= (transaction.amount + amount);
            } else {
                user.balance += (transaction.amount + amount);
            }
        }
        if (transaction.type === type) {

            if (transaction.type === "income") {
                user.balance = - transaction.amount + amount;
            } else {
                user.balance = transaction.amount - amount;
            }

        }
        user.save();
    }

}
