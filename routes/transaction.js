const express = require('express');
const router= express.Router()
const transactionController = require('../controllers/transactionController')



router.post('/transaction/create',(req,res)=>{

    transactionController.create(req,res);
});

router.route('transaction/{id}').delete((req,res)=>{
    transactionController.delete(req,res);
}).put((req,res)=>{
    transactionController.edit(req,res);
})


module.exports = router;

