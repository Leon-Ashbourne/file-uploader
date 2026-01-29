
function checkUSerSession(req, res, next) {
    if(req.user) {
        next();
        return;
    }
    res.render('signup/signup');
}

function redirectUserToLib(req, res) {
    res.locals.user = req.user;
    res.render("library/library");
}

const authentication = [ checkUSerSession, redirectUserToLib ];

module.exports = {
    authentication
};