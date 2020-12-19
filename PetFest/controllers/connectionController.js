const Connection = require('../models/connection');
const User = require('../models/user');
const validationResult = require('express-validator').validationResult;


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
            var na = "";
            if (req.session.user !== undefined)
                na = req.session.user.name;
            res.status(200).render('connections/connections', { newArray, name: na + ' Welcome to PetFest!' });

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
            if (result) {
                User.find({ savedConnection: { $elemMatch: { key: { $eq: req.params.id }, val : {$eq: 'yes'} } } })
                    .then(count => {
                        var na = "";
                        if (req.session.user !== undefined)
                            na = req.session.user.name;
                        if (count) {
                            res.render('connections/connection', { item: result, count: count.length, name: na + ' Welcome to PetFest!' });
                        }
                        else {
                            res.render('connections/connection', { item: result, count: 0, name: na + ' Welcome to PetFest!' });
                        }
                    });

            }
            else {
                next();
            }
        })
        .catch(err => {
            console.log(err);
            next();
        });
}

exports.getConnectionCreate = (req, res, next) => {


    Connection.find()
        .then(all => {
            topics = [];
            all.forEach(item => {
                if (!topics.includes(item.connectionTopic))
                    topics.push(item.connectionTopic);
            });

            res.render('connections/newConnection', { conTopics: topics, name: req.session.user.name + ' Welcome to PetFest!' });
        });

}


exports.createConnection = (req, res, next) => {

    const errors = validationResult(req);
    console.log(errors.array());
    if (errors.isEmpty()) {

        let connection = new Connection({
            connectionName: req.body.connectionName,
            dateTime: req.body.dateTime,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            connectionTopic: req.body.connectionTopic,
            details: req.body.details,
            location: req.body.location,
            hostName: req.session.user.id,
            image: req.body.image
        });
        connection.save()
            .then(result => {
                req.flash('success', 'You created Connection Successfully');
                res.redirect('/connections');
            })
            .catch(err => {
                console.log(err);
                next();
            });

    }
    else {
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        res.redirect('/connections');
    }
}


exports.getConnectionUpdate = (req, res, next) => {

    var topics = [];
    Connection.find()
        .then(all => {
            topics = [];
            all.forEach(item => {
                if (!topics.includes(item.connectionTopic))
                    topics.push(item.connectionTopic);
            });
        })

    Connection.findById(req.params.id)
        .then(ifTrue => {
            if (ifTrue && ifTrue.hostName.equals(req.session.user.id))

                Connection.findById(req.params.id)
                    .populate('hostName')
                    .then(conn => {
                        if (conn)
                            res.render('connections/editConnection', { data: conn, cat: topics, name: req.session.user.name + ' Welcome to PetFest!' });
                        else
                            // next();
                            req.flash('error', 'you are not authorized to view');
                        res.redirect('/connections');
                    })

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

    const errors = validationResult(req);
    console.log(errors.array());
    if (errors.isEmpty()) {

        let conParams = {
            connectionName: req.body.connectionName,
            dateTime: req.body.dateTime,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            connectionTopic: req.body.connectionTopic,
            details: req.body.details,
            location: req.body.location,
            hostName: req.session.user.id,
            image: req.body.image
        };
        Connection.findById(req.params.id)
            .then(result => {
                if (result.hostName.equals(req.session.user.id))
                    Connection.findByIdAndUpdate(req.params.id, { $set: conParams })
                        .then(result => {
                            if (result) {
                                req.flash('success', 'Connection updated');
                                res.redirect('/connections/' + req.params.id);
                            }
                            else
                                res.redirect('/connections');
                        })
                else
                    res.redirect('/connections');
            }).catch(err => {
                console.log(err);
                next();
            });

    }
    else {
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        res.redirect('/connections/' + req.params.id + '/update?');
    }
}




exports.getConnectionByCatAndName = (req, res, next) => {
    var cat = req.params.cat;
    var name = req.params.name;
    // var item = findByNameAndType(name, cat);
    Connection.findOne({ connectionName: name, connectionTopic: cat })
        .then((item) => {
            console.log("val " + JSON.stringify(item));
            if (item !== undefined) res.render('connection', { item, name: req.session.user.name + ' Welcome to PetFest!' });
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
            if (result.hostName.equals(req.session.user.id))
                // User.update({"savedConnection.key": req.params.id}, {$pull: { savedConnection: { key: req.params.id } }},{ status: true },{multi: true})
                // User.update({ $pullAll: { savedConnection: { key: req.params.id } } }, { status: true }, { multi: true })

                User.find({ 'savedConnection.key': req.params.id })
                    .then(users => {
                        console.log(users.length);
                        if (users)                            
                            users.forEach(user => {
                                console.log(" inside user")
                                User.updateOne(user, { $pull: { savedConnection: { key: req.params.id } } })
                                .then(result => {
                                    if(result)
                                       console.log("one")

                                });
                            });
                            Connection.findByIdAndDelete(req.params.id)
                                            .then(result => {
                                                console.log("inside condition");
                                                req.flash('success', 'Connection Deleted');
                                                res.redirect('/connections');
                                            });
                    })

                // User.find({ 'savedConnection.key': req.params.id })
                //     .then(users => {
                //         console.log(users.length);
                //         if (users)
                //             User.updateMany(users, { $pull: { savedConnection: { key: req.params.id } } },{upsert: false, multi: true})
                //                 .then(result => {
                //                     if (result) {
                //                         console.log("one")
                //                         Connection.findByIdAndDelete(req.params.id)
                //                             .then(result => {
                //                                 console.log("inside condition");
                //                                 req.flash('success', 'Connection Deleted');
                //                                 res.redirect('/connections');
                //                             });
                //                     }
                //                 });
                //     });
            else {
                req.flash('error', 'You need to logIn for this operation');
                res.redirect('/connections');
            }
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
                            User.updateOne(user, { $push: { savedConnection: { key: req.params.id } } })
                                .then(success => {
                                    if (success)
                                        // res.status(200).render('savedConnection', user.savedConnection);
                                        User.findById(req.session.id, { savedConnections: 1 })
                                            .then(conArray => {
                                                if (conArray)
                                                    res.render('connections/savedConnection', { conList: conArray, name: req.session.user.name + ' Welcome to PetFest!' });
                                                else
                                                    next();
                                            });
                                    else
                                        // res.status(200).render('savedConnection', user.savedConnection);
                                        User.findById(req.session.id, { savedConnections: 1 })
                                            .then(conArray => {
                                                if (conArray)
                                                    res.render('connections/savedConnection', { conList: conArray, name: req.session.user.name + ' Welcome to PetFest!' });
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
                    .then(success => {
                        if (success)
                            // res.status(200).render('savedConnection', user.savedConnection);
                            User.findById(req.session.id, { savedConnections: 1 })
                                .then(conArray => {
                                    if (conArray)
                                        res.render('connections/savedConnection', { conList, name: req.session.user.name + ' Welcome to PetFest!' });
                                    else
                                        next();
                                });
                        else
                            // res.status(200).render('savedConnection', user.savedConnection);
                            User.findById(req.session.id, { savedConnections: 1 })
                                .then(conArray => {
                                    if (conArray)
                                        res.render('connections/savedConnection', { conList, name: req.session.user.name + ' Welcome to PetFest!' });
                                    else
                                        next();
                                });
                    })
        }).catch(err => {
            console.log(err);
            next();
        });

}