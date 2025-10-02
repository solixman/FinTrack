const express = require('express');
const app = express();
require('dotenv').config();

const session = require('express-session');
const sessionConfig = require('./config/session');
const flash=require("connect-flash");
const router= express.Router();
const cookieParser = require("cookie-parser");


app.use(cookieParser());
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended : true }));
app.use(express.json())
app.use(session(sessionConfig));
app.use(flash());



const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const ViewsRouter = require('./routes/views');
const transactionRouter = require('./routes/transaction')
const categoryRouter = require('./routes/category')
const savingGoalRouter = require('./routes/savingGoal')
const budgetsRouter = require('./routes/budgets')
const passwordRouter = require('./routes/passwordReset')


app.use('/auth',authRouter);
app.use(ViewsRouter);
app.use(transactionRouter)
app.use(categoryRouter);
app.use(savingGoalRouter);
app.use(budgetsRouter);
app.use('/user',userRouter);
app.use(passwordRouter);




app.listen(process.env.PORT);


