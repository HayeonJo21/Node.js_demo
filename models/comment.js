const mongoose = require("mongoose"),
commentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  writerNickname: {
    type: String
  },
  originalPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }
});

module.exports = mongoose.model("comment", commentSchema);
