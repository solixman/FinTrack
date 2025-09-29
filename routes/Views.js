const { render } = require('ejs');
const express = require('express');
const dashboardController = require('../controllers/dashboardController');
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

router.get('/transaction', async (req, res) => {
   dashboardController.index(req,res);
});

module.exports = router