const { Budget,User } = require('../models');


module.exports = {


    async getBudgets(id, limit = 'undefined') {
        try {

            if (limit = 'undefined') {

                return await Budget.findAll({
                    where: { userId: id },
                    order: [['createdAt', 'DESC']],
                });
            } else {
                return await Budget.findAll({
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


    async create(req,res){


           try {
            let user = await User.findByPk(req.session.user.id);
            let { limitAmount ,categoryId } = req.body;
            limitAmount = parseFloat(limitAmount);
          
            
            if (!limitAmount) {
                req.flash('error', "limit Amount are required");
                return res.redirect(req.get('referer') || '/budgets-categories');
            }
            
            await Budget.create({ userId: user.id, limitAmount: limitAmount, categoryId:categoryId })
            req.flash('message', "Budget created successfully");
            return res.redirect(req.get('referer') || '//budgets-categories');

        } catch (error) {

            console.log(error);
            req.flash('error', "something went wrong");
            return res.redirect(req.get('referer') || '//budgets-categories');
        }

    }


}