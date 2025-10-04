const express = require('express');
const router= express.Router()
const transactionController = require('../controllers/transactionController')
const checkUser=require('../middlewares/checkUser');


router.use(checkUser);

router.post('/transaction/create',(req,res)=>{

    transactionController.create(req,res);
});

router.post('/transaction/delete/:id',(req,res)=>{
    transactionController.delete(req,res);
})

router.post('/transaction/update/:id',(req,res)=>{
    transactionController.update(req,res);
})

router.get('/transactions', async (req, res) => {
   transactionController.index(req,res);
});



module.exports = router;

