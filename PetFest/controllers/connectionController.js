const Connection = require('../models/connection');
const User = require('../models/user');


exports.getAllConnections = (req, res, next) => {
    Connection.find()
        .then((all) => {
            var topics = [];
            all.forEach(item => {
                if (!topics.includes(item.connectionTopic))
                    topics.push(item.connectionTopic);
            });
            var newArray = [];
            topics.forEach(item => {
                obj = {}
                obj[item] = all.filter(element => element.connectionTopic === item)
                newArray.push(obj);
            });

            

            res.status(200).render('connections/connections', { newArray, name: req.session.user.name+' Welcome to PetFest!'});

        })
        .catch(err => {
            console.log(err);
            next();
        });
}

exports.getConnectionDetail = (req, res, next) => {
    // console.log(req.param.id);
    Connection.findById(req.params.id)
    // .populate('hostName','firstName')
    .populate('hostName')
        .then(result => {
            if(result){
                // console.log(result)
                res.render('connections/connection', {item: result, name: req.session.user.name+' Welcome to PetFest!'});
            }
            else{
                next();}
        })
        .catch(err => {
            console.log(err);
            next();
        });
}

exports.getConnectionCreate = (req, res, next) => {
    res.render('connections/create', {name: req.session.user.name+' Welcome to PetFest!'});
}


exports.createConnection = (req, res, next) => {
    let connection = new Connection({
        connectionName: req.body.connectionName,
        dateTime: req.body.dateTime,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        connectionTopic: req.body.connectionTopic,
        details: req.body.details,
        location: req.body.location,
        hostName: req.session.hostName.id,
        image: req.body.image
    });
    connection.save()
        .then(result => {
            res.redirect('/connections');
        })
        .catch(err => {
            console.log(err);
            next();
        });
}


exports.getConnectionUpdate = (req, res, next) => {

    var topics = [];
    Connection.find()
    .then(all =>{
        topics = [];
        all.forEach(item => {
            if (!topics.includes(item.connectionTopic))
                topics.push(item.connectionTopic);
        });
    })

    Connection.findById(req.params.id)
        .then(result => {
            if (result && result.user.equals(req.session.user.id))
                res.render('connections/editConnection', { data: result,cat: topics, name: req.session.user.name+' Welcome to PetFest!' });
            else
                // next();
                res.redirect('/connections');
        })
        .catch(err => {
            console.log(err);
            next();
        });
}

exports.updateConnection = (req, res, next) => {
    let conParams = {
        connectionName: req.body.connectionName,
        dateTime: req.body.dateTime,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        connectionTopic: req.body.connectionTopic,
        details: req.body.details,
        location: req.body.location,
        hostName: req.body.hostName,
        image: req.body.image
    };
    connection.findById(req.params.id)
        .then(result => {
            if (result.user.equals(req.session.user.id))
                Connection.findByIdAndUpdate(req.params.id, { $set: conParams })
                    .then(result => {

                        res.redirect('connections/' + req.params.id);
                    })
            else
                res.redirect('/connections');
        }).catch(err => {
            console.log(err);
            next();
        });
}




exports.getConnectionByCatAndName = (req, res, next) => {
    var cat = req.params.cat;
    var name = req.params.name;
    // var item = findByNameAndType(name, cat);
    Connection.findOne({ connectionName: name, connectionTopic: cat })
        .then((item) => {
            console.log("val " + JSON.stringify(item));
            if (item !== undefined) res.render('connection', { item, name: req.session.user.name+' Welcome to PetFest!' });
            else {
                var errString = "No matching connection can be found.";
                res.status(404).render('error', { errString });
            }
        })
        .catch(err => {
            console.log(err);
            next();
        });
}


exports.deleteConnection = (req, res, next) => {
    Connection.findById(req.params.id)
        .then(result => {
            if (result.user.equals(req.session.user.id))
                Connection.findByIdAndDelete(req.params.id)
                    .then(result => {
                        res.redirect('/connections');
                    })
            else
                res.redirect('/connections');
        }).catch(err => {
            console.log(err);
            next();
        });
}


exports.authenticate = (req, res, next) => {
    if (!req.session.user) {
        res.redirect("/users/login");
    } else {
        next();
    }
}


exports.saveConnectionToUser = (req, res, next) => {
    Connection.findById(req.params.id)
        .then(connection => {
            if (connection)
                User.findById(req.session.user.id)
                    .then(user => {
                        if (user)
                            User.updateOne(user, { $push: { savedConnection: req.params.id } })
                                .then(success => {
                                    if (success)
                                        // res.status(200).render('savedConnection', user.savedConnection);
                                        User.findById(req.session.id, { savedConnections: 1 })
                                            .then(conArray => {
                                                if (conArray)
                                                    res.render('connections/savedConnection', { conList, name: req.session.user.name+' Welcome to PetFest!' });
                                                else
                                                    next();
                                            });
                                    else
                                        // res.status(200).render('savedConnection', user.savedConnection);
                                        User.findById(req.session.id, { savedConnections: 1 })
                                            .then(conArray => {
                                                if (conArray)
                                                    res.render('connections/savedConnection', { conList, name: req.session.user.name+' Welcome to PetFest!' });
                                                else
                                                    next();
                                            });

                                })
                        else
                            next();
                    })
        }).catch(err => {
            console.log(err);
            next();
        });

}

exports.deleteConnectionFromUser = (req, res, next) => {
    Connection.findById(req.params.id)
        .then(connection => {
            if (connection)
                User.findById(req.session.user.id)
                    .then(user => {
                        if (success)
                            // res.status(200).render('savedConnection', user.savedConnection);
                            User.findById(req.session.id, { savedConnections: 1 })
                                .then(conArray => {
                                    if (conArray)
                                        res.render('connections/savedConnection', { conList, name: req.session.user.name+' Welcome to PetFest!'});
                                    else
                                        next();
                                });
                        else
                            // res.status(200).render('savedConnection', user.savedConnection);
                            User.findById(req.session.id, { savedConnections: 1 })
                                .then(conArray => {
                                    if (conArray)
                                        res.render('connections/savedConnection', { conList, name: req.session.user.name+' Welcome to PetFest!' });
                                    else
                                        next();
                                });
                    })
        }).catch(err => {
            console.log(err);
            next();
        });

}