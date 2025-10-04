const express = require('express');
const router= express.Router()
const savingGoalController=require('../controllers/savingGoalController');
const checkUser=require('../middlewares/checkUser');

router.use(checkUser);


router.get('/savingGoals',(req,res)=>{

savingGoalController.index(req,res);
})
router.post('/savingGoal/create',(req,res)=>{

savingGoalController.create(req,res);
})

router.post('/savingGoal/addMoney/:id',(req,res)=>{
    savingGoalController.addMoney(req,res);
})


module.exports = router;