const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const MessageRouter = require('./routes/MessageRoute');
const UserRouter = require('./routes/UserRoute')
const authMiddleware = require("./middleware/authMiddleware")
require('./middleware/passport')
const passport = require('passport')
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session')
const cors = require('cors')
const app = express();

// Enable enviorment variables

dotenv.config();

// Connect to Database

const connection = mongoose.connect(process.env.CONNECTION_TO_DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connected to Database")
}).catch(error => {
    console.log(error)
})


// Enable middleware

app.use(bodyParser.json())
app.use(cors({
    origin: "http://localhost:3001", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
}));
app.use(flash())
app.use(session({ secret: "cat", resave: false, saveUninitialized: true, cookie: { secure: true } }))
app.use(passport.initialize())
app.use(passport.session())

// Initiating Routes

app.use('/api/messages', MessageRouter)
app.use('/api/users/', UserRouter)

// Starting Server

app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

// Checking if server is up and running

app.get('/', (req, res) => {
    res.send("Server Running")
})