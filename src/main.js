const path = require('path');
const express = require('express');
const morgan = require('morgan');
methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const nodemailer = require('nodemailer');

const app = express();
const port = 5000;

const route = require('./routes');

const db = require('./config/db');

//Connect to db
db.connect();

//app.use(express.static(path.join(__dirname, 'public')));

//middleware xu ly form data
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
// console.log('Views directory:', path.join(__dirname, 'resources/views'));

//route init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
