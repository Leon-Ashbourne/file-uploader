
function homeSessionCheck(req, res, next) {
    if(req.user) {
        next();
        return;
    }
    res.render("home/home.ejs");
}

function homeSessionRender(req, res) {
    res.locals.user = req.user;
    res.render("home/home.ejs");
}

const homeRender = [ homeSessionCheck, homeSessionRender ];

module.exports = { 
    homeRender
}