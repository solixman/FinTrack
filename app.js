const express = require('express');
const app = express();
require('dotenv').config();

const session = require('express-session');
const sessionConfig = require('./config/session');
const flash=require("connect-flash");
const router= express.Router();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended : true }));
app.use(express.json())
app.use(session(sessionConfig));
app.use(flash());


const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const authViewsRouter = require('./routes/authViews');

app.use('/users',userRouter)
app.use('/auth',authRouter)
app.use(authViewsRouter)






app.listen(process.env.PORT);


