const express = require('express');
const router= express.Router()
const categoryController=require('../controllers/categoryController')

router.post('/category/create',(req,res)=>{

    categoryController.create(req,res);

})

module.exports = router