const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const router = require('./routes/routes');
const mongoose = require('mongoose');;
const cors = require('cors')
const app = express();

// Enable enviorment variables

dotenv.config();

// Connect to Database

mongoose.connect(process.env.CONNECTION_TO_DB, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }).then(() => {
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
app.use('/api', router)

// Starting Server

app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});