const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

const getUser = require("../models/script").getUser;

passport.use(
    new LocalStrategy(
        async function(passport, username, done) {
            try {
                const result = await getUser(username, passport);
                if(!result) done(null, result);
                else done(null, null)
                return;
            }catch(err) {
                done(err);
            }
        
        }
    )
)

passport.serializeUser(
    function(user, done) {
        return done(null, user.id);
    }
)

passport.deserializeUser(
    async (id, done) => {
        try {
            const user = await getUserById(id);
            if(!user) done(null, user);
        }catch(err) {
            done(err)
        }
    }
)

module.exports = passport;