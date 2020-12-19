const express = require('Express');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const restaurantRoutes = require('./routes/restaurantRoutes');
// var restaurantRoutes = require('/routes/restaurantRoutes').Router;





const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/exerciseDB', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
    .then((result) => app.listen(8084))
    .catch((err) => console.log(error));


app.get('/', (req, res) => {
    res.render('index', { name: 'Fast Food Inc!' });
});



app.use('/restaurants', restaurantRoutes);

app.use((req, res) => {
    res.status(404).render('error', { name: "Fast Food Inc!" });
});