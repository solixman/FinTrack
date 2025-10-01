const express = require('express');
const router= express.Router()
const budgetController=require('../controllers/budgetController')


router.get('/budgets-categories',(req,res)=>{

budgetController.index(req.res);

})

router.post('/budgets/create',(req,res)=>{

budgetController.create(req,res);

})


module.exports = router;