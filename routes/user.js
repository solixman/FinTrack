const express= require('express');
const router = express.Router();
const UserController=require('../controllers/userController');


router.get('/user/profile',(req,res)=>{
    UserController.Profile(req,res)

});

module.exports = router