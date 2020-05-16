const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const MessageRouter = require('./routes/MessageRoute');
const UserRouter = require('./routes/UserRoute')
const authMiddleware = require("./middleware/authMiddleware")
const mongoose = require('mongoose');
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
app.use(cors());
app.get('/', (req, res) => {
    res.send("Server Running")
})


app.use('/api/messages', authMiddleware, MessageRouter)
app.use('/api/users/', UserRouter)

// Starting Server

app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});