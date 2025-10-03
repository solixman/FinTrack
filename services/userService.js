const { User, Transaction, Category, SavingGoal } = require('../models');
const { Op } = require("sequelize");
const ejs = require('ejs')
const http = require('http');
const jsreport = require('jsreport')({httpPort: 5488});



module.exports = {


    async getData(id) {

        const user = await User.findByPk(id);

        const start = new Date(new Date().setDate(new Date().getDate() - 30));


        const transactions = await Transaction.findAll({
            where: {
                userId: user.id,
                date: {
                    [Op.gte]: start,
                }
            },
            include: [Category]
        });


        let totalIncome = 0;
        let totalExpenses = 0;

        transactions.forEach(T => {
            if (T.type === 'income') {
                totalIncome += T.amount;
            } else {
                totalExpenses += T.amount
            }
        });

        const netSavings = totalIncome - totalExpenses;


        let categoryTotals = {};

        transactions.forEach(T => {
            let Cname = T.Category ? T.Category.name : 'Uncategorized';
            if (!categoryTotals[Cname]) {
                categoryTotals[Cname] = 0;
            }
            categoryTotals[Cname] += T.amount;
        });


        const goals = await SavingGoal.findAll({ where: { userId: user.id } });

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
    },


    async generateReport(data, res) {

        const reportHTML = await ejs.renderFile(__dirname + '/../views/report/report.ejs', { data });

         await jsreport.init();
        const out = await jsreport.render({
            template: {
                content: reportHTML,
                engine: 'none',
                recipe: 'chrome-pdf'
            }
        });

        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=FinancialReport.pdf'
        });

       return out.stream.pipe(res);

    }

}