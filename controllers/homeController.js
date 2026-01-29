
function homeSessionCheck(req, res, next) {
    if(req.user) {
        next();
        return;
    }
    res.render("home/home.ejs", { user: "" });
}

function homeSessionRender(req, res) {
    const user = req.user;
    res.render("home/home.ejs", { user: user });
}

const homeRender = [ homeSessionCheck, homeSessionRender ];

module.exports = { 
    homeRender
}