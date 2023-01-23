const express = require('express');
require('dotenv').config();
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const connectDb = require('./config/dbConn');
connectDb();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const mongoSanitize = require('express-mongo-sanitize');


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later"
  });
  
    app.use(morgan('combined'));
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(cookieParser());
    app.use(limiter);
    app.use(helmet());
    app.use(mongoSanitize());


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));
app.use('/auth', require('./routes/authRoute'));
app.use('/users', require('./routes/userRoute'));
app.use('/collections', require('./routes/collectionRoute'));


mongoose.connection.once('open', () => {
    console.log('Connected to database');
    app.listen(3000, () => {console.log('Server is running on port 3000');});
});




