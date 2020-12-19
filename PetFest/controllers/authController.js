exports.isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        req.flash('error','You are not logged In');
        res.redirect("/users/logIn");
        
        
    } else {
        next();
    } 
}


exports.isLoggedOut = (req, res, next) => {
    if (req.session.user) {
        req.flash('error','You are already logged In');
        res.redirect("/users/savedConnections");
    } else {
        next();
    }
}