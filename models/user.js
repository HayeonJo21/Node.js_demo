const mongoose = require("mongoose"),

userSchema = mongoose.Schema({
  name : {
    first: {
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
  }],
},

  {
    timestamps: true
});

userSchema.virtual("fullName")
.get(function() {
  return '${this.name.last} ${this.name.first}';
});


module.exports = mongoose.model("User", userSchema);
