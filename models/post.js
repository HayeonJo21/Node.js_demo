const mongoose = require("mongoose"),

postSchema = mongoose.Schema({
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
    type: Date
  },

  views: {
    type: Number
  },

  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});
