const mongoose = require("mongoose"),
passportLocalMongoose = require("passport-local-mongoose"),

userSchema = mongoose.Schema({
  name : {
    type: String,
    required: true
  },

  nickname: {
    type: String
  },

  id :{
    type: String,
    required: true,
    unique: true
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

  jams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Jam"
  }],

  post : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }],
},

  {
    timestamps: true
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: "id"
});

userSchema.methods.passwordComparison = function(inputPassword){
  let user = this;
  console.log("inputPassword: " + inputPassword);
  console.log("user password: " + user.password);
  return bcrypt.compare(inputPassword, user.password);
};

module.exports = mongoose.model("User", userSchema);
