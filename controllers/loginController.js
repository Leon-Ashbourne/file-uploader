
function loginRender(req, res) {
    res.render("log-in/login", { user: "" });
}

function loginPostReq(req, res) {
    const user = req.user;
    res.render("/", { user: user });
}

module.exports = {
    loginRender,
    loginPostReq
}