const express = require('express');
const cookieParser = require("cookie-parser")
require('dotenv').config();
const bodyParser = require('body-parser')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes');

const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/transactions',authMiddleware, transactionRoutes);
app.use('/api/users', authMiddleware, userRoutes);



app.use((err,req,res,next) => {
  res.status(400).send({
    message: "Something went wrong",
    reason: err.message
  })
})


app.listen(process.env.PORT, () => {
  console.log('app listening');
})