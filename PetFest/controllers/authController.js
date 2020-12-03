exports.isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        res.redirect("/users/savedConnections");
    } else {
        next();
    }
}


exports.isLoggedOut = (req, res, next) => {
    if (req.session.user) {
        res.redirect("/users/savedConnections");
    } else {
        next();
    }
}