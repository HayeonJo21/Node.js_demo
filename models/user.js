const mongoose = require("mongoose"),
bcrypt = require("bcrypt"),

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
  console.log("first: " + this.name.first + " last: " + this.name.last + "NAME: " + this.name);
  return this.name.last + this.name.first;
});

userSchema.pre("save", function(next){
  let user = this;

  bcrypt.hash(user.password, 10).then(hash => {
    user.password = hash;
    next();
  })
  .catch(error => {
    console.log("Error in hasing password: " + error.message);
    next(error);
  });
});

userSchema.methods.passwordComparison = function(inputPassword){
  let user = this;
  console.log("inputPassword: " + inputPassword);
  console.log("user password: " + user.password);
  return bcrypt.compare(inputPassword, user.password);
};

module.exports = mongoose.model("User", userSchema);
