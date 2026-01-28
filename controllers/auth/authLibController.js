
function authentication(req, res, next) {
    //checking sessions
    res.redirect('/log-in')
}

module.exports = authentication;