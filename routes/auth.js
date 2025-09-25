const express = require('express');
const router= express.Router()
const authController = require('../controllers/authController')


router.post('/register',(req,res)=>{

  authController.register(req,res);
   
    
}); 

router.post('/login',(req,res)=>{

});
router.get('/logout',(req,res)=>{

});

router.get('/me',(req,res)=>{

});
router.get('/forgotPassword',(req,res)=>{

});
router.get('/changePassword',(req,res)=>{

});

module.exports = router;