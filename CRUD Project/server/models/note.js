const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    title : String,
    content : String

},{collection:"crud1"});
const Note = mongoose.model("Note",noteSchema);
module.exports = Note;
