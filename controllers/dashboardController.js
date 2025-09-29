const { render } = require('ejs');
const { User } = require('../models')
const transactionController = require('../controllers/transactionController');
const savingGoalController = require('../controllers/savingGoalController');
const budgetController = require('../controllers/budgetController');

module.exports = {



    async renderDashboard(req, res) {

        try {
            const user = await User.findByPk(req.session.user.id);

            let transactions = await transactionController.getTransactions(user.id, 5);
            let savingGoals = await savingGoalController.getSavingGoals(user.id, 5);
            let budgets = await budgetController.getBudgets(user.id, 5);


            const dashboardHTML = await require('ejs').renderFile(__dirname + '/../views/pages/dashboard.ejs', {
                user,
                transactions,
                savingGoals,
                budgets,
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
}