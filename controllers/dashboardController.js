const { render } = require('ejs');
const { User, Transaction } = require('../models')

module.exports = {



    async renderDashboard(req, res) {

        try {
            const user = await User.findByPk(req.session.user.id);

            let transactions = await this.getTransactions(user.id);


            const dashboardHTML = await require('ejs').renderFile(__dirname + '/../views/pages/dashboard.ejs', {
                user,
                transactions
            });

            res.render('../views/index.ejs', {
                error: req.flash('error'),
                message: req.flash('message'),
                title: 'dashboard',
                user,
                body: dashboardHTML
            });

            return;
        } catch (error) {
            console.log(error);
            return res.send('something went wrong')
        }

    },


    async getTransactions(id) {
        try {

            return await Transaction.findAll({
                where: { userId: id },
                order: [['createdAt', 'DESC']],
                limit: 5
            });

        } catch (error) {
            console.error(error);
            throw new Error('Error fetching transactions');
        }

    }



}