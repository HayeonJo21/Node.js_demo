const mongoose = require("mongoose"),
{ Schema } = require("mongoose");

const messageSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  receiver: {
    type: String
  },
  date: {
    type: String
  }
});

module.exports = mongoose.model("Message", messageSchema);
