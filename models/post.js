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

  likes: {
    type: Number
  },

  date: {
    type: String
  },

  views: {
    type: Number
  },

  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }
});

module.exports = mongoose.model("Post", postSchema);
