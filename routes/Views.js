const { render } = require('ejs');
const express = require('express');
const router = express.Router()

router.get('/register', (req, res) => {
    res.render('../views/pages/register.ejs', { error: req.flash('error') })
});

router.get('/login', (req, res) => {
    res.render('../views/pages/login.ejs', { error: req.flash('error') });
});

router.get('/dashboard', async (req, res) => {
    try {
        let user = req.session.user;
        let transactions = [
            { category: 'Food', amount: 25, date: '2025-09-28' },
            { category: 'Salary', amount: 1200, date: '2025-09-25' }
        ];

        const dashboardHTML = await require('ejs').renderFile(__dirname + '/../views/pages/dashboard.ejs', {
            balance: 1000,
            currency: "USD",
            transactions
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
   return  res.send('something went wrong')
    }
});

module.exports = router