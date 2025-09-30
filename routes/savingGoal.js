const express = require('express');
const router= express.Router()
const savingGoalController=require('../controllers/savingGoalController');



router.get('/savingGoals',(req,res)=>{

savingGoalController.index(req,res);
})


module.exports = router;