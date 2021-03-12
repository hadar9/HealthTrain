const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect to DB
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

const Port = process.env.PORT || 5000;

app.listen(Port, () => console.log(`Server started on PORT ${Port}...`));
