const express= require('express');
const router = express.Router();
const UserController=require('../controllers/userController');


router.get('/profile',(req,res)=>{
    UserController.Profile(req,res)

});

router.post('/update',(req,res)=>{
    UserController.update(req,res)

});
router.post('/change-password',(req,res)=>{
    UserController.changePassword(req,res)

});

module.exports = router