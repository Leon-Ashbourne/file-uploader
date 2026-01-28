const express = require("express");
const session = require("express-session");
const path  = require("node:path");

require("dotenv/config")

const homeRouter = require("./routes/homeRouter")
const libRouter = require("./routes/libRouter")
const authLibraryRouter = require("./routes/auth/authLibraryRouter");
const loginRouter = require("./routes/loginRouter");
const signupRouter = require("./routes/signupRouter")

const app = express();

//views 
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//assets
const assetsUrl = path.join(__dirname, "public");
app.use(express.static(assetsUrl));
app.use(express.urlencoded({ extended: true }));

//session storage


//routes
app.use("/library", authLibraryRouter, libRouter);
app.use("/log-in", loginRouter)
app.use("/sign-up", signupRouter);
app.use("/", homeRouter )

const PORT = 3030;
app.listen(PORT, (error) => {
    if(error) {
        console.error(error);
    };

    console.log(`Successfully listening at port ${PORT}`);
})