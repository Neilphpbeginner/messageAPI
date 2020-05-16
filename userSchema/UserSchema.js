const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new mongoose.Schema({
    username: String,
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        trim: true,
        unique: true
    },
    password: String
});

UserSchema.plugin(AutoIncrement, { inc_field: 'user_id', start_seq: 1000 })



module.exports = mongoose.model('users', UserSchema)
