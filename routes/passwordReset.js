const express = require('express');
const router= express.Router()
const authController=require('../controllers/authController')


router.post('/forgot-password',(req, res) => {
    authController.handelForgottenPassword(req,res);
});

router.get('/reset-password',(req,res)=>{
    authController.changePasswordBytoken(req,res);
})

module.exports = router;