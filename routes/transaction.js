const express = require('express');
const router= express.Router()
const transactionController = require('../controllers/transactionController')



router.post('/transaction/create',(req,res)=>{

    transactionController.create(req,res);
});


module.exports = router;

