
function homeRender(req, res) {
    res.render("home/home.ejs", { title: "Home" });
}


module.exports = { 
    homeRender
}