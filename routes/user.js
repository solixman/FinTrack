const express= require('express');
const router = express.Router();
const UserController=require('../controllers/userController');


router.get('/profile',(req,res)=>{
    UserController.Profile(req,res)

});

router.post('/update',(req,res)=>{
    UserController.update(req,res)

});

module.exports = router