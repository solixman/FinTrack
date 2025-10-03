const { Category, SavingGoal, User } = require('../models')

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
            let { targetAmount, targetDate, currentAmount, purpose, takeFromBalance } = req.body;
            let user = await User.findByPk(id);
            targetAmount = parseFloat(targetAmount);
            currentAmount = parseFloat(currentAmount);
            
            if (!targetAmount) {
                req.flash('error', "Target amount are required");
                return res.redirect(req.get('referer') || '/savingGoals');
            }
            
            
            if (takeFromBalance === "yes" && currentAmount !== 0) {
                
                if (currentAmount < user.balance) {
                    user.balance -= currentAmount;
                user.save();
                } else {
                    req.flash('error', "if you wanna take from balance the current Amount should be smaller than the balance");
                    return res.redirect(req.get('referer') || '/savingGoals');
                    
                }
                
            }
            
            await SavingGoal.create({ userId: id, targetAmount: targetAmount, purpose: purpose, currentAmount: currentAmount, targetDate: targetDate })
            req.flash('message', "Saving goal created successfully");
            return res.redirect(req.get('referer') || '/savingGoals');

        } catch (error) {

            console.log(error);
            req.flash('error', "something went wrong");
            return res.redirect(req.get('referer') || '/savingGoals');
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

    },


    async addMoney(req,res){

         try {
             let { amount,takeFromBalance } = req.body;
             let user = await User.findByPk(req.session.user.id);
             amount = parseFloat(amount);
             
             
            
             if (!amount) {
                 req.flash('error', "Target amount are required");
                 return res.redirect(req.get('referer') || '/savingGoals');
                }
                
                
                if (takeFromBalance === "yes" && amount !== 0) {
                    
                if (amount < user.balance) {
                    user.balance -= amount;
                } else {
                    req.flash('error', "if you wanna take from balance the current Amount should be smaller than the balance");
                    return res.redirect(req.get('referer') || '/savingGoals');
                    
                }
            }
            
            let id=req.params.id;
            let savingGoal= await SavingGoal.findByPk(id);
             savingGoal.currentAmount+=amount;
            
             console.log('user is :',user);
             console.log('saving Goal is :',savingGoal);

            await savingGoal.save();
            await user.save();
            
            req.flash('message', "amount added  successfully");
            return res.redirect(req.get('referer') || '/savingGoals');
            
         } catch (error) {
              console.log(error);
            req.flash('error', "something went wrong");
            return res.redirect(req.get('referer') || '/savingGoals');
         }



    }


}