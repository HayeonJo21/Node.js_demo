const mongoose = require("mongoose"),
courseSchema = mongoose.Schema({
  title: String,
  cost: String,
  description: String
});

module.exports = mongoose.model("Course", courseSchema); // 모듈 export 시에만 Subscriber를 익스포트.
