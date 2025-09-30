const { Category } = require('../models')


module.exports = {


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

    async getBudgetsAndCategories(userId) {
        try {
            
            const categories = await Category.findAll({
                include: [
                    {
                        model: Budget,
                        where: { userId },
                        required: false, 
                        limit: 1, 
                        order: [['createdAt', 'DESC']], 
                    }
                ]
            });

            return categories;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }




}