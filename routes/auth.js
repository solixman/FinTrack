const express = require('express');
const router= express.Router()

router.post('/register',(req,res)=>{
console.log(req.body);      
  console.log(req.body.name); 
  res.send('hiiii'+`i am ${req.body.name}`);
   
    
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