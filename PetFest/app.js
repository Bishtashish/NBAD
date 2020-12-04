
const mongoose = require('mongoose');
var express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const connectionRoutes = require('./routes/connectionRoutes');
const userRoutes = require('./routes/userRoutes');
const moment = require("moment");

var app = express();
app.set('view engine', 'ejs')
app.use(express.static('css'));
app.use(express.static('models'));
app.use(express.static('resources'));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/petFest', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
    .then((result) => app.listen(8084)) 
    .catch((err) => console.log(error));

app.use(session({
    secret: 'NBDA',
    resave: false,
    saveUninitialized: false,
}));


app.use(methodOverride('_method'));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.moment = moment;
    next();
});


app.get('/index', function (req, res) {
    var name ="";
if(req.session.user!== undefined)
    name = req.session.user.name+' Welcome to PetFest!';
else
    name = "Welcome to PetFest!";

    res.status(200).render('index', {name});
})


app.use('/connections', connectionRoutes);

app.use('/users', userRoutes);

app.get('/about', function (req, res, next) {
    res.status(200).render('about');
})

app.get('/contact', function (req, res, next) {
    res.status(200).render('contact');
})

app.use((req, res) => {
    var errString = "Page cannot be found on the server.";
    res.status(404).render('error', { errString, name: "Welcome to PetFest!" });
})
