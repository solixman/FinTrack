const { Budget } = require('../models');


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

    }


}