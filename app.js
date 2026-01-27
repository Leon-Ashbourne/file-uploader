const express = require("express");
const session = require("express-session");
const path  = require("node:path");

const homeRouter = require("./routes/homeRouter")
const libRouter = require("./routes/libRouter")

const app = express();

//views 
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//routes
app.use("/library", libRouter);
app.use("/", homeRouter )


const PORT = 3030;
app.listen(PORT, (error) => {
    if(error) {
        console.error(error);
    };

    console.log(`Successfully listening at port ${PORT}`);
})