
function libRender(req, res) {
    res.render("library/library.ejs", { title: "library" });
}

module.exports = {
    libRender,
}