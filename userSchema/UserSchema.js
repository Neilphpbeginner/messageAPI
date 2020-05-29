const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    profile_pic: String,
    googleID: String,
    email: {
        type: mongoose.Schema.Types.String,
        trim: true,
        unique: true,
        required: true
    },
    password: String
});

UserSchema.plugin(AutoIncrement, { inc_field: 'user_id', start_seq: 1000 })

module.exports = mongoose.model('users', UserSchema)
