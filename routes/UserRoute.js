const router = require('express').Router();
const mongoose = require('mongoose');
const UserModel = require('../userSchema/UserSchema');
const bcrypt = require('bcrypt');
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 10)
    const newUser = new UserModel({
        first_name: req.body.given_name,
        last_name: req.body.family_name,
        profile_pic: req.body.picture,
        googleID: req.body.sub,
        email: req.body.email,
        password: hash
    });

    try {
        const savedUser = await newUser.save((error) => {
            if (error) {
                res.send("User already on the system")
            } else {
                res.send("User created the database")
            }
        })
    } catch (error) {
        res.send("User Already on the database")
    }
});

router.post('/login', passport.authenticate('local', {
    failureFlash: true,
    successFlash: true,
    session: true
}), (req, res) => {
    res.json({
        sessionId: req.sessionID,
    })
})

router.get('/auth/google',
    passport.authenticate('google', { scope: ["profile", "email"] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        const googleUser = req.user._json
        UserModel.findOne({ email: googleUser.email }, async (error, user) => {
            if (error) {
                res.send(error)
            }
            if (user) {
                res.json({
                    sessionId: req.sessionID,
                })
            } else {
                const newUser = new UserModel({
                    first_name: googleUser.given_name,
                    last_name: googleUser.family_name,
                    profile_pic: googleUser.picture,
                    googleID: googleUser.sub,
                    email: googleUser.email
                })

                try {
                    const googleuser = await newUser.save((error) => {
                        if (error) {
                            res.send("Google user could not be created")
                        } else {
                            res.json({
                                sessionId: req.sessionID,
                            })
                        }
                    })
                } catch (error) {
                    res.send(error)
                }
            }
        })
    });

module.exports = router;