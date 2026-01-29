
function checkUSerSession(req, res, next) {
    if(req.user) {
        next();
        return;
    }
    res.render('signup/signup', { user: "" });
}

function redirectUserToLib(req, res) {
    const { username } = req.user;
    res.render("/", { username: username });
}

const authentication = [ checkUSerSession, redirectUserToLib ];

module.exports = {
    authentication
};