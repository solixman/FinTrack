const express = require('express');
const router= express.Router()
const categoryController=require('../controllers/categoryController')

router.post('/category/create',(req,res)=>{

    categoryController.create(req,res);

})



router.get('/budgets-categories',(req,res)=>{

categoryController.index(req.res);

})


module.exports = router