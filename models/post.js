const mongoose = require("mongoose"),

postSchema = mongoose.Schema({
category: {
  type: String,
  required: true
},

title: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  },

  filename: {
    type: String
  },

  like: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  date: {
    type: String
  },

  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  writerNickname: {
    type: String
  },

  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }
});

module.exports = mongoose.model("Post", postSchema);
