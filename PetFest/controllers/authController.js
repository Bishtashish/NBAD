exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        next();
        
    } else {
        res.redirect("/users/logIn");
    } 
}


exports.isLoggedOut = (req, res, next) => {
    if (req.session.user) {
        res.redirect("/users/savedConnections");
    } else {
        next();
    }
}