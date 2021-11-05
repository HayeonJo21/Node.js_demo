const mongoose = require("mongoose"),

userSchema = mongoose.Schema({
  name : {
    fisrt: {
      type: String,
      trim: true
    },
    last: {
      type: String,
      trim: true
    }
  },

  nickname: {
    type: String
  },

  id :{
    type: String,
    required: true
  },

  password: {
    type: String,
    required:true
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },

  profile: {
    type: String
  },

  position: {
    type: String,
    required: true
  },

  post : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }]
});

module.exports = mongoose.model("User", userSchema);
