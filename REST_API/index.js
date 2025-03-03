const express = require("express");
const mongoose = require("mongoose");
const user = require("./models/user");
require("dotenv").config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MONGODB connected"))
  .catch((err) => {
    console.error("MONGODB connection erro: ", err);
    process.exit(0);
  });

app.get("/users", async (req, res) => {
  try {
    const users = await user.find({});
    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

app.post("/add", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const newuser = new user({ name, email, age });
    await newuser.save();
    return res.status(201).json({ message: "user added" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    await user.findByIdAndUpdate(req.params.id, { name, email, age });
    return res.status(200).json({ message: "user updated" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    await user.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "user deleted" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server is working fine");
});
