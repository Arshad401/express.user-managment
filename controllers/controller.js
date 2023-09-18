const mongoose = require("mongoose");
const User = require("../models/userschema");
const Admin = require("../models/adminschema");
const jwt = require("jsonwebtoken");
mongoose.connect("mongodb://0.0.0.0:27017/user-management", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  //
  // Register an admin account (POST /register)
  //
  register: async (req, res) => {
    const { name, email, username, password } = req.body;
    await Admin.create({
      name: name,
      email: email,
      username: username,
      password: password,
    });
    res.json({ message: "Admin registered successfully" });
  },
  //
  // Admin Login (POST /login)
  //
  login: async (req, res) => {
    const { username, password } = req.body;

    const admin = Admin.findOne({ username: username, password: password });
    if (!admin) {
      return res.status(404).json({ error: "User not found" });
    }
    const token = jwt.sign(
      { username: admin.username },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({ message: "Login successful", token });
  },
  //
  // Create a user with name, email, username, and photo (POST /users)
  //
  createuser: async (req, res) => {
    const { name, email, username } = req.body;
    const photo = req.file ? req.file.filename : "";
    await User.create({
      name: name,
      email: email,
      username: username,
      photo: photo,
    });
    res.json({ message: "User created successfully" });
  },
  //
  // Get all users list (GET /users)
  //
  getallusers: async (req, res) => {
    const allusers = await User.find();
    res.status(200).json({
      status: "success",
      message: "Successfully fetched user datas.",
      data: allusers,
    });
  },
  //
  // Get a specific user based on the id provided (GET /users/:id)
  //
  getuserByid: async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully fetched user data.",
      data: user,
    });
  },
  //
  // Update a specific user (PUT /users/:id)
  //
  updateuserByid: async (req, res) => {
    const userId = req.params.id;
    const { name, email, username } = req.body;
    const user = await User.findByIdAndUpdate(userId, {
      $set: { name, username, email },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User updated successfully" });
  },
  //
  // Delete a specific user (DELETE /users/:id)
  //
  deleteuserByid: async (req, res) => {
    const userId = req.params.id;
    const user = await User.findByIdAndRemove(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  },
};