const express = require('express');
const app = express();
const router= express.Router();

const dotenv = require('dotenv').config();

app.set('view engine', 'ejs');
// app.use(express.static('public'))
const userRouter = require('./routes/users')

app.get('/',(req,res)=>{
res.send('hiiiiiiii')
});








app.use('/users',userRouter)




const port=process.env.Port;
app.listen(port);


