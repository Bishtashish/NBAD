var express = require('express');
// var serveStatic = require('serve-static')
var app = express();
app.set('view engine', 'ejs')
var server = app.listen(8084, function () {
    console.log('Node server is running..');
});


var fastFoodArr = require('./models/fastFood.js').objArray;
var addFastFood = require('./models/fastFood.js').addFastFood;
var removeFastFood = require('./models/fastFood.js').removeFastFood;
var findFastFood = require('./models/fastFood.js').findFastFood;
var editFastFood = require('./models/fastFood.js').editFastFood;
var arr=[];
fastFoodArr.forEach(element => arr.push(element));

// Middleware & Static
app.use(express.static('public'));


app.get('/index', function(req,res){
    // res.render('index.ejs');
    res.render('index',{arr});
})


// app.get('/restaurant', function(req,res){
//     res.render('restaurant.ejs');
// })


app.get('/restaurant/:name', function(req,res){
    var route = req.params.name; 
    // console.log(route);
    var obj = findFastFood(route);
    console.log("val "+JSON.stringify(obj))
    if(obj !==undefined){
    res.render('restaurant',{obj});
    }
    else{
        var errString= "No matching restaurant can be found.";
        res.status(404).render('error',{ errString});
    }
})

app.use((req, res) =>{
    var errString= "Page cannot be found on the server.";
    res.status(404).render('error',{errString});
})