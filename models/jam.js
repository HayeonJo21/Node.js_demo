const mongoose = require("mongoose"),
jamSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  requiredPosition: [{
    type: String,
    required: true
  }],

  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  description: String
});

module.exports = mongoose.model("Jam", jamSchema);
