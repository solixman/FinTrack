const express = require('express');
const router= express.Router()
const budgetController=require('../controllers/budgetController')


router.get('/budgets',(req,res)=>{

budgetController.index(req.res);

})


module.exports = router;