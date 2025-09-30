const express = require('express');
const router= express.Router()
const savingGoalController=require('../controllers/savingGoalController');



router.get('/savingGoals',(req,res)=>{

savingGoalController.index(req,res);
})
router.get('/savingGoal/create',(req,res)=>{

savingGoalController.create(req,res);
})


module.exports = router;