const mongoose = require("mongoose");
const { Schema } = mongoose;

const Note = new Schema({
    title: { required: true, type: String },
    description: { required: true, type: String },
    date: { type: Date, default: Date.now()},
    user: {type: String}
});

module.exports = mongoose.model('Note', Note);