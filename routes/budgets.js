const express = require('express');
const router= express.Router()
const budgetController=require('../controllers/budgetController')
const checkUser=require('../middlewares/checkUser');

router.use(checkUser);


router.get('/budgets-categories',(req,res)=>{
budgetController.index(req.res);
})

router.post('/budgets/create',(req,res)=>{
budgetController.create(req,res);
})

router.get('/budgets/delete/:id',(req,res)=>{
    budgetController.delete(req,res);
})


module.exports = router;