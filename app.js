const express = require("express");
const session = require("express-session");
const path  = require("node:path");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { prisma } = require("./lib/prisma");

require("dotenv/config")

const homeRouter = require("./routes/homeRouter")
const libRouter = require("./routes/libRouter")
const loginRouter = require("./routes/loginRouter");
const signupRouter = require("./routes/signupRouter")
const passport = require("./passport/passport");
const error = require("./controllers/errorController");

const app = express();

//views 
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//assets
const assetsUrl = path.join(__dirname, "public");
app.use(express.static(assetsUrl));
app.use(express.urlencoded({ extended: true }));

//session storage
app.use(
    session({
        cookie: {
            maxAge: 7*24*60*60*1000,
        },
        resave: false,
        saveUninitialized: false,
        store: new PrismaSessionStore(
            prisma,
            {
                checkPeriod: 2 * 60 * 1000,  
                dbRecordIdIsSessionId: true,
                dbRecordIdFunction: undefined,
            }
        ),
        secret: process.env.SECRET
    })
)
app.use(passport.session());

//routes
app.use("/library", libRouter);
app.use("/log-in", loginRouter)
app.use("/sign-up", signupRouter);
app.get("/log-out", 
    (req, res, next) => {
        req.logout((err) => {
            if(err) { return next(err); };
            res.redirect("/");
        })
    }
)
app.use("/", homeRouter )
app.use("/{*splat}", error);

//errors
app.use("/", 
    (req, res, next, err) => {
        res.render("error") //show error page for now
    }
)

const PORT = 3030;
app.listen(PORT, (error) => {
    if(error) {
        console.error(error);
    };

    console.log(`Successfully listening at port ${PORT}`);
})