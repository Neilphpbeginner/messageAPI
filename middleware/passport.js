const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20')
const UserModel = require('../userSchema/UserSchema');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')

dotenv.config()

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    UserModel.findById(id, (error, user) => {
        done(error, user)
    })
})

passport.use(new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password"
    },
    (username, password, done) => {
        UserModel.findOne({ email: username }, (err, user) => {
            if (err) {
                return done(err)
            }
            if (!user) {
                return done(null, false, { message: "Incorrect Username" })
            }
            if (!bcrypt.compareSync(password, user.password, (error => { if (error) { console.log() } }))) {
                return done(null, false, { message: "Incorrect Password" })
            }
            return done(null, user)
        })
    }
))

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api/users/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
        done(null, profile)
    }
))






