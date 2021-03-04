const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const mongoConnect = require('./util/database').MongoConnect;
const authRoutes = require('./routes/auth');
const mongoose = require('mongoose');
const app = express();

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// this is to fix CORS error
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use(authRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data});
})
// mongoConnect(() => {
//     // console.log("Yea reached here");
//     app.listen(8080);
// });

mongoose
  .connect(
    'mongodb+srv://bothrag:gunj241990@mycluster-coo01.mongodb.net/test?retryWrites=true'
  )
  .then(result => {
    app.listen(8080);
    console.log("Reached here");
  })
  .catch(err => {
    console.log(err);
  });