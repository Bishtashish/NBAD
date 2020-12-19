const mongoose = require('mongoose');
const express = require('express');
const methodOverride = require('method-override');
const restaurantRoutes = require('./routes/restaurantRoutes');
const userRoutes = require('./routes/userRoutes');
const session = require('express-session');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret:'NBAD',
    resave: false,
    saceUninitiated: false

}));
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});


mongoose.connect('mongodb://localhost:27017/exerciseDB', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
    .then((result) => app.listen(8084))
    .catch((err) => console.log(error));


app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('index', { name: 'Fast Food Inc!' })
});

app.use('/restaurants', restaurantRoutes);

app.use('/users', userRoutes);


app.use((req, res) => {
    res.status(404).render('error', { msg: 'Page cannot be found', name: "Fast Food Inc!" });
});