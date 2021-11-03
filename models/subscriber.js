const mongoose = require("mongoose"),
subscriberSchema = mongoose.Schema({
  name : String,
  email: String,
  zipCode: Number
});

module.exports = mongoose.model("Subscriber", subscriberSchema); // 모듈 export 시에만 Subscriber를 익스포트.
