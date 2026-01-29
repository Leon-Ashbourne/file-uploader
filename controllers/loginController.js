
function loginRender(req, res) {
    res.render("log-in/login");
}

function loginPostReq(req, res) {
    res.locals.user = req.user;
    res.render("home/home");
}

module.exports = {
    loginRender,
    loginPostReq
}