const { User,Budget, Category } = require('../models')


module.exports = {


    async index(req,res){

         try {
            const user = await User.findByPk(req.session.user.id);
            const categories = await this.getBudgetsAndCategories(user.id);

            const CaBHTML = await require('ejs').renderFile(__dirname + '/../views/pages/categories&budgets.ejs', {
                user,
                categories
            });

            return res.render('../views/index.ejs', {
                error: req.flash('error'),
                message: req.flash('message'),
                title: 'Transactions',
                user,
                body: CaBHTML
            });
            
        } catch (error) {
            console.log(error);
            return res.redirect(req.get('referer') || '/dashboard');
        }



    },

    async create(req, res) {

        try {

            const { name, description, type } = req.body;
            await Category.create({ name: name }, { description: description }, { type: type });


            res.send('done')
        } catch (error) {
            console.log(error);
            res.send('something went wrong')
        }

    },

    async getBudgetsAndCategories(userId, limit = "undefined") {
        try {

            if (limit === "undefined") {



                const categories = await Category.findAll({
                    include: [
                        {
                            model: Budget,
                            where: { userId },
                            required: false,
                            limit: 1,
                            order: [['createdAt', 'DESC']],
                        }
                    ],
                });
                return categories;
            } else {
                const categories = await Category.findAll({
                    include: [
                        {
                            model: Budget,
                            where: { userId },
                            required: false,
                            limit: 1,
                            order: [['createdAt', 'DESC']],
                        }
                    ],
                });
                return categories;
            }


        } catch (error) {
            console.error(error);
            throw error;
        }
    }




}