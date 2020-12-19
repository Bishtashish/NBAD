exports.isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        // res.locals.errorMessages = req.flash('error');
        // res.locals.successMessages = req.flash('success');
        req.flash('error','You are not logged In');
        res.redirect("/users/login");
    } else {
        next();
    }
}


exports.isLoggedOut = (req, res, next) => {
    if (req.session.user) {
        // res.locals.errorMessages = req.flash('error');
        // res.locals.successMessages = req.flash('success');
        req.flash('error','You are already logged In');
        res.redirect("/users/savedConnections");
    } else {
        next();
    }
}