var express = require('express');
var mongoose = require('mongoose');
var Restaurant = require('./models/Restaurant');
// var serveStatic = require('serve-static')
var app = express();
app.use(express.urlencoded({extended:true}));


// const dbURI = 'mongodb://localhost:27017/'
app.set('view engine', 'ejs')


mongoose.connect('mongodb://localhost:27017/exerciseDB', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
    .then((result) => app.listen(8084))
    .catch((err) => console.log(error));


// Middleware & Static
app.use(express.static('public'));



app.get('/index', function(req,res,next){
    // res.render('index.ejs');
    Restaurant.find().then((result) => {
        res.render('index',{restaurants: result});
    })
    .catch((err) =>{
        console.log(err);
    })
})


// app.get('/restaurant', function(req,res){
//     res.render('restaurant.ejs');
// })


app.post('/', function(req, res, next){
    
    const restaurant = new Restaurant(req.body);
    restaurant.save().then((result) =>{
        res.redirect('/index');
    })
    .catch((err) =>{
        console.log(err);
        next();
    });
})


app.get('/restaurant/create', function(req, res, next){
    res.render('create');
})

app.get('/restaurant/:id', function(req,res, next){
    var id = req.params.id; 
    // console.log(route);
    // var obj = findFastFood(route);
    // console.log("val "+JSON.stringify(obj))

    Restaurant.findById(id).then((result) => {
        res.render('restaurant',{restaurant: result});
    })
    .catch((err) =>{
        console.log(err);
        next();
    });
})

app.use((req, res) =>{
    var errString= "Page cannot be found on the server.";
    res.status(404).render('error',{errString});
})