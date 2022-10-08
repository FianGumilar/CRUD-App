const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./server/database/connection')
const axios = require('axios')

const usersRoutes = require('./server/routes/users');

const app = express();

//log request 
app.use(morgan('dev'));

//connection mongoDB
connectDB();

//request to body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs")

//load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

app.use('/', usersRoutes);

dotenv.config({ path: '.env' })
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {console.log(`Listening on http://localhost:${PORT}`)});