const { User, Transaction, Category, SavingGoal }= require('../models');
const { Op } = require("sequelize");


module.exports = {


    async getData(id) {

        const user = await User.findByPk(id); 

        const start =  new Date(new Date().setDate(new Date().getDate() - 30));
        

        const transactions = await Transaction.findAll({
      where: {
        userId:user.id,
        date:{
            [Op.gte]:  start,
        } 
      },
      include: [Category]
    });


    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach(T => {
        if(T.type === 'income'){
            totalIncome+= T.amount;
        }else{
            totalExpenses+=T.amount
        }
    });

    const netSavings = totalIncome - totalExpenses;


    let categoryTotals={};

    transactions.forEach(T => {
        let Cname= T.Category ? T.Category.name : 'Uncategorized';
        if(!categoryTotals[Cname]){
            categoryTotals[Cname]=0;
        }
        categoryTotals[Cname]+=T.amount;
    });


    const goals = await SavingGoal.findAll({ where: { userId:user.id } });

    const Data = {
      user,
      startDate: start,
      summary: {
        totalIncome,
        totalExpenses,
        netSavings
      },
      transactions,
      categories: categoryTotals,
      goals,
    };


    return Data;
    }

}