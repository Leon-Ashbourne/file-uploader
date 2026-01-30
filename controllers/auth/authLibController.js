
function checkUSerSession(req, res, next) {
    if(req.user) {
        next();
        return;
    }
    res.render('signup/signup');
}


module.exports = {
    checkUSerSession
}