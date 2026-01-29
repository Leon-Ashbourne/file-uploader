const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

const getUser = require("../models/script").getUser;
const getUserById = require("../models/script").getUserById;

passport.use(
    new LocalStrategy(
        async function(username, password, done) {
            try {
                let result = await getUser(username, password);
                result = result[0];
                if(result) done(null, result);
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
            if(user) done(null, user);
            else done(null, null);
        }catch(err) {
            done(err)
        }
    }
)

module.exports = passport;