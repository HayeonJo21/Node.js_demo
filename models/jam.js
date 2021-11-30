const mongoose = require("mongoose"),
jamSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  date: String,

  requiredPosition: [{
    type: String
  }],

  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  hostNickname: String,

  description: String,

  filename: String,

  originalJam: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Jam"
  }],

  participant: Number

});

module.exports = mongoose.model("Jam", jamSchema);
