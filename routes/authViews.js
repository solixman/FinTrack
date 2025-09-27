const { render } = require('ejs');
const express = require('express');
const router= express.Router()

router.get('/register',(req,res)=>{
  
    res.render('../views/register.ejs',{ error : req.flash('error')})

}); 

router.get('/login',(req,res)=>{
 res.render('../views/login.ejs');
});
router.get('/logout',(req,res)=>{

});

router.get('/me',(req,res)=>{

});


router.get('changePassword',(req,res)=>{

});

module.exports = router;