const { SavingGoal,User } = require('../models')

module.exports = {



    async index(req, res) {

        try {
            const user = await User.findByPk(req.session.user.id);
            const savingGoals = await this.getSavingGoals(user.id)

            const categories = await Category.findAll();
            const savingGoalsHTML = await require('ejs').renderFile(__dirname + '/../views/pages/savingGoals.ejs', {
                user,
                savingGoals,
                categories
            });

            return res.render('../views/index.ejs', {
                error: req.flash('error'),
                message: req.flash('message'),
                title: 'Saving Goals',
                user,
                body: savingGoalsHTML
            });

        } catch (error) {
            req.flash('error', "something went wrong");
            console.log(error);
            return res.redirect(req.get('referer') || '/dashboard');
        }
    },



    async create(req, res) {
        try {
            let id = req.session.user.id;
            const { targetAmount, targetDate, currentAmount } = req.body;

            if (!targetAmount || !targetDate) {
                req.flash('error', "Target amount and date are required");
                return res.redirect(req.get('referer') || '/dashboard');
            }

            let savingGoal = await SavingGoal.create({ userId: id, targetAmount: targetAmount, currentAmount: currentAmount, targetDate: targetDate })
            req.flash('message', "Saving goal created successfully");
            return res.redirect(req.get('referer') || '/dashboard');

        } catch (error) {
            req.flash('error', "something went wrong");
            return res.redirect(req.get('referer') || '/dashboard');
        }
    },

    async getSavingGoals(id, limit = 'undefined') {
        try {

            if (limit = 'undefined') {

                return await SavingGoal.findAll({
                    where: { userId: id },
                    order: [['createdAt', 'DESC']],
                });
            } else {
                return await SavingGoal.findAll({
                    where: { userId: id },
                    order: [['createdAt', 'DESC']],
                    limit: 5
                });
            }

        } catch (error) {
            console.error(error);
            throw new Error('Error fetching savingGoals');
        }

    }


}