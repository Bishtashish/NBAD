const mongoose = require('mongoose');
const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const restaurantRoutes = require('./routes/restaurantRoutes');
const userRoutes = require('./routes/userRoutes');
const flash = require('connect-flash');


const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/exerciseDB2', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
    .then((result) => app.listen(8084))
    .catch((err) => console.log(error));

app.use(session({
    secret: 'NBDA',
    resave: false,
    saveUninitialized: false,
}));

app.use(flash());


app.use(methodOverride('_method'));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    // console.log(res.locals.errorMessages);
    // console.log(res.locals.successMessages);
    next();
});

app.get('/', (req, res) => {
    // console.log('error', res.locals.errorMessages);
    // console.log('success', res.locals.successMessages);
    res.render('index', { name: 'Fast Food Inc!' })
});

app.use('/restaurants', restaurantRoutes);
app.use('/users', userRoutes);


app.use((req, res) => {
    res.status(404).render('error', { msg: 'Page cannot be found', name: "Fast Food Inc!" });
});

app.use((error, req, res) => {
    res.status(500).render('error', { msg: 'Sorry, our application is experiencing a problem', name: "Fast Food Inc!" });
});