const express = require('express');
const router= express.Router()
const categoryController=require('../controllers/categoryController')

router.post('/categories/create',(req,res)=>{

    categoryController.create(req,res);

})



router.get('/budgets-categories',(req,res)=>{

categoryController.index(req,res);

})

router.get('/categories/delete/:id',(req,res)=>{
    categoryController.delete(req,res);
})


module.exports = router