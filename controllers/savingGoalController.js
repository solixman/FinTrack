const { SavingGoal } = require('../models')

module.exports = {


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