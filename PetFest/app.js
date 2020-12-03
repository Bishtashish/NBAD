const { anyLimit } = require('async');
const mongoose = require('mongoose');
var express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const connectionRoutes = require('./routes/connectionRoutes');
const userRoutes = require('./routes/userRoutes');

var app = express();
app.set('view engine', 'ejs')
// var colEvent = require('./models/connectionGroups.js').collEvents;
// var findByName = require('./models/connectionGroups.js').findConName;
// var findByNameAndType = require('./models/connectionGroups.js').findConNameTopic;
// const { addConnection } = require('./models/savedConnections.js');
// const { removeConnection} = require('./models/savedConnections.js');

// var conArray = require('./models/savedConnections.js').objArray;
app.use(express.static('css'));
app.use(express.static('models'));
app.use(express.static('resources'));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/petFest', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
    .then((result) => app.listen(8084)) 
    .catch((err) => console.log(error));

// colEvent = Connection.find();
// var conTopics =[]
// colEvent.forEach(item=> {
//     if(!conTopics.includes(item.connectionTopic))
//         conTopics.push(item.connectionTopic);
// })

app.use(session({
    secret: 'NBDA',
    resave: false,
    saveUninitialized: false,
}));


app.use(methodOverride('_method'));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});
// var server = app.listen(8084, function () {
//     console.log('Node server for PetFest is running..');
// });

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



// app.get('/logIn', function (req, res) {
//     res.status(200).render('logIn');
// })

// app.get('/signUp', function (req, res) {
//     res.status(200).render('signUp');
// })

// app.get('/connections', function (req, res) {
//     // var arrMeet = [], arrMerch = [], arrNews = [], arrGroom = [], arrTrain = [], arrAdopt = [];
//     // conTopics =[]
//     Connection.find()
//     .then((all) =>{
//         var topics = [];
//         all.forEach(item => {
//             if(!topics.includes(item.connectionTopic))
//             topics.push(item.connectionTopic);  
//         });
//         var newArray = [];
//         topics.forEach(item =>{
//             obj = {}
//             obj[item]=all.filter(element => element.connectionTopic===item)
//             newArray.push(obj);   
//         });

//     })

//     // colEvent.forEach(item=> {
//     //     if(!conTopics.includes(item.connectionTopic))
//     //         conTopics.push(item.connectionTopic);
//     // })
//     // var newArray = []
//     // conTopics.forEach(item =>{

//     //     obj = {}
//     //     obj[item]=colEvent.filter(element => element.connectionTopic===item)
//     //     newArray.push(obj);
//     // })


//     // colEvent.forEach(item => {
//         // var obj = {};
//         // if (item.connectionTopic === "Meetup") {
//         //     obj['type'] = item.connectionTopic;
//         //     obj['name'] = item.connectionName;
//         //     arrMeet.push(obj);
//         // }
//         // else if (item.connectionTopic === "Merch") {
//         //     obj['type'] = item.connectionTopic;
//         //     obj['name'] = item.connectionName;
//         //     arrMerch.push(obj);
//         // }
//         // else if (item.connectionTopic === "News") {
//         //     obj['type'] = item.connectionTopic;
//         //     obj['name'] = item.connectionName;
//         //     arrNews.push(obj);
//         // }
//         // else if (item.connectionTopic === "Groom") {
//         //     obj['type'] = item.connectionTopic;
//         //     obj['name'] = item.connectionName;
//         //     arrGroom.push(obj);
//         // }
//         // else if (item.connectionTopic === "Training") {
//         //     obj['type'] = item.connectionTopic;
//         //     obj['name'] = item.connectionName;
//         //     arrTrain.push(obj);
//         // }
//         // else if (item.connectionTopic === "Adoption") {
//         //     obj['type'] = item.connectionTopic;
//         //     obj['name'] = item.connectionName;
//         //     arrAdopt.push(obj);
//         // }
//     // });
// console.log(newArray);

//     // res.status(200).render('connections', { arrMeet, arrMerch, arrNews, arrGroom, arrTrain, arrAdopt });
//     res.status(200).render('connections', {  newArray});
// })

// app.get('/connection/:cat/:name', function (req, res) {
//     var cat = req.params.cat;
//     var name = req.params.name;
//     // var item = findByNameAndType(name, cat);
//     var item = Connection.findOne({connectionName: name, connectionTopic: cat});
//     console.log("val " + JSON.stringify(item))
//     if (item !== undefined) res.render('connection', { item });
//     else {
//         var errString = "No matching connection can be found.";
//         res.status(404).render('error', { errString });
//     }
// })

// app.get('/savedConnection/:name', function (req, res) {
//     var name = req.params.name;
//     // var item = findByName(name);
//     var item = Connection.findAll({connectionName: name});
//     if (item !== undefined) {
//         console.log(JSON.stringify(item));
//         // addConnection(item);
//     }
//     res.status(200).render('savedConnection', { conArray });
// })


// app.get('/savedConnection/', function (req, res) {
//     res.status(200).render('savedConnection', { conArray });
// })



// app.get('/savedConnection/:name/:del', function (req, res) {
//     var name = req.params.name;
//     var del = req.params.del;
//     // var item = findByName(name);
//     var item = Connection.findOne({connectionName: name});
//     // if(del === 'del' && item !== undefined) removeConnection(name);
//     if(del === 'del' && item !== undefined) Connection.delete({connectionName: name});
//     res.status(200).render('savedConnection', { conArray });
// })

app.get('/about', function (req, res) {
    res.status(200).render('about');
})

app.get('/contact', function (req, res) {
    res.status(200).render('contact');
})

app.use((req, res) => {
    var errString = "Page cannot be found on the server.";
    res.status(404).render('error', { errString, name: "Welcome to PetFest!" });
})
