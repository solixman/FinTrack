const express = require('express');
const router= express.Router()
const authController = require('../controllers/authController')


router.post('/register',(req,res)=>{
  authController.register(req,res); 
}); 

router.post('/login',(req,res)=>{

  authController.login(req,res)
  
});
router.get('/logout',(req,res)=>{
  
  authController.logout(req,res)
});

router.get('/current',(req,res)=>{
  user=req.session.user;
  return req.send(user)
});

router.post('/forgot-password',(req, res) => {
    authController.handelForgottenPassword(req,res);
});


module.exports = router;