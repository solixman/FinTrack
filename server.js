const express = require('express');
const app = express();

const router= express.Router();
const dotenv = require('dotenv').config();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended : true }));

const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const authViewsRouter = require('./routes/authViews');


// app.get('/',(req,res)=>{
// res.send('hiiiiiiii');
// });


app.use('/users',userRouter)
app.use('/auth',authRouter)
app.use(authViewsRouter)









app.listen(process.env.PORT);


