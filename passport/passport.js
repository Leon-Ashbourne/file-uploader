const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const bcrypt = require("bcryptjs");

const { getUserByUsername, getUserById } = require("../models/script") ;

passport.use(
    new LocalStrategy(
        async function(username, password, done) {
            try {

                let result = await getUserByUsername(username);
                result = result[0];
                if(!result) {
                    done(null, null);
                    return;
                }
                const isValid = await bcrypt.compare(password, result.password);

                if(isValid) {
                    const id = result.id;
                    done(null, {
                        id,
                        username
                    })
                }
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