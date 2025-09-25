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
  console.log(user);
  console.log(req.session.isLoggedIn);
  
  res.send('in current user');
});
router.get('/forgotPassword',(req,res)=>{

});
router.get('/changePassword',(req,res)=>{

});

module.exports = router;