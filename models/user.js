const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name:{
    type : String,
    required: true
  },
  email:{
    type: String,
    require: true,
    unique_id: true,
  },
  password:{
    type: String,
    require: true,
    minlength: 6
  },
  role: {
  type: String,
  enum: ["user", "admin"],
  default: "user",
}
},
{timeStamps : true},
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);