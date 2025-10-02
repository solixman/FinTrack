const { render } = require('ejs');
const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const authController = require('../controllers/authController');
const router = express.Router()




router.get('/register', (req, res) => {
    res.render('../views/pages/register.ejs', { error: req.flash('error') })
});

router.get('/login', (req, res) => {
    res.render('../views/pages/login.ejs', { error: req.flash('error') });
});

router.get('/dashboard', async (req, res) => {
   dashboardController.renderDashboard(req,res);
});
router.get('/', async (req, res) => {
   res.render('../views/pages/landingPage.ejs')
});

router.get('/forgot-password',(req, res) => {
    return res.render('../views/pages/giveEmail.ejs', { error: req.flash('error') });

})
   


module.exports = router