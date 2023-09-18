const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  password: String
});

module.exports=mongoose.model('Admin',adminSchema);