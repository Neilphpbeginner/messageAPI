const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

messageSchema = new mongoose.Schema({
    subject: String,
    message: String,
    date: {
        type: Date,
        default: Date.now
    }
},
)

// messageSchema.plugin(AutoIncrement)

module.exports = mongoose.model('messages', messageSchema);