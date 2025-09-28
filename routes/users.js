const express = require('express');
const router= express.Router()



router.get('/', (req,res)=>{

//  console.log(req.session.user)
        console.log(req.session)
        res.send('hereeeee');

});

router.get('/new',(req,res)=>{
    res.send('users nez list')

});

router.route('/:id').get((req,res)=>{

    res.send(`users has name: ${req.user.name}`)

}).put((req,res)=>{
    res.send(`update users has id: ${req.params.id}`)

}).delete((req,res)=>{
        res.send(`delete users has id: ${req.params.id}`)
        
})


// const users=[{name:'soulayman'},{name:'fchfach'}];

// router.param("id",(req,res,next,id)=>{
//      req.user= users[id];   
//      console.log('here')
//     next()
// })




module.exports = router;