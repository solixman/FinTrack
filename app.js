const express = require('express');
const app = express();

const session = require('express-session');
const sessionConfig = require('./config/session');
const router= express.Router();
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended : true }));
app.use(express.json())
app.use(session(sessionConfig));



const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const authViewsRouter = require('./routes/authViews');

app.use('/users',userRouter)
app.use('/auth',authRouter)
app.use(authViewsRouter)






app.listen(process.env.PORT);


