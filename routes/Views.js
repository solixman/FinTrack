const { render } = require('ejs');
const express = require('express');
const router= express.Router()

router.get('/register',(req,res)=>{
    res.render('../views/register.ejs',{ error : req.flash('error')})
}); 

router.get('/login',(req,res)=>{
 res.render('../views/login.ejs',{ error : req.flash('error')});
});

router.get('/dashboard',(req,res)=>{
    res.render('../views/dashboard', {error:req.flash('error'),message:req.flash('message')});

});

module.exports=router