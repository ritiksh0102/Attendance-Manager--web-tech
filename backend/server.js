const express = require('express');
const cors =require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app =express(); 
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = process.env.ALTAS_URI;
mongoose.connect(uri, { useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database Connection established successfully")
});

const usersRouter= require('./routes/users');
const DoctorRouter= require('./routes/Doctor.js')


app.use('/Doctor',DoctorRouter);
app.use('/users', usersRouter);


app.listen(port, () => {
     console.log(`server is running on port: ${port}`);
});

