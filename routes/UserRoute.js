const router = require('express').Router();
const mongoose = require('mongoose');
const UserModel = require('../userSchema/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 10)
    const newUser = new UserModel({
        username: req.body.username,
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

router.post('/login', async (req, res, next) => {
    const userLogin = await UserModel.findOne({ email: req.body.email }).exec();
    if (userLogin) {
        const passwordCheck = await bcrypt.compare(req.body.password, userLogin.password, (error, result) => {
            if (!result) {
                res.status(404).send("Incorrect Password")
            } else {
                const token = jwt.sign({ data: userLogin.user_id }, process.env.SECRET, {
                    expiresIn: '10m',
                    algorithm: 'HS256',
                })
                res.header('auth-token', token).send(token)
            }
        })
    } else {
        res.status(404).send("User not registered")
    }

})
module.exports = router;