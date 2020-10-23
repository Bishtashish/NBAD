var express = require('express');
var app = express();
app.set('view engine','ejs')
var server = app.listen(8084, function(){
    console.log('Node server for PetFest is running..');
});
var conArray = require('./models/savedConnections').objArray;

var arr=[];
conArray.forEach(element =>  arr.push(element));

// app.use(express.static('public'));

// const path = require('path');
// const cssPath = path.join(__dirname, '/css');
// const jsPath = path.join(__dirname, '/models');
// const resPath = path.join(__dirname, '/resources');

// app.use("/css" ,express.static('css'));
// app.use("/models",express.static('models')); 
// app.use("/resources",express.static('resources')); 
app.use(express.static('css'));
app.use(express.static('models'));
app.use(express.static('resources'));




app.get('/', function(req, res){
    res.status(200).render('index',{arr});
})

app.get('/logIn', function(req,res){
    res.status(200).render('logIn');
})

app.get('/signUp', function(req, res){
    res.status(200).render('signIn');
})

app.get('/connections', function(req,res){
    res.status(200).render('connections');
})

app.get('/connections', function(req,res){
    res.status(200).render('connections',{arr});
})

app.get('/savedConnections', function(req,res){
    res.status(200).render('asvedConnections',{arr});
})

app.get('/about',function(req,res){
    res.status(200).render('about');
})

app.get('/contact',function(req,res){
    res.status(200).render('contact');
})

app.use((req, res) =>{
    var errString= "Page cannot be found on the server.";
    res.status(404).render('error',{errString});
})





