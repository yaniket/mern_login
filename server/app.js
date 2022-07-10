const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authenticate = require("./middleware/authenticate");

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT;
require("./db/conn");
// const User = require("./model/userSchema");
app.use(express.json());

app.use(cookieParser());
app.use(require("./router/auth"));

// app.get("/about", authenticate, (req, res) => {
//   res.send("Hello world from about");
// });

// app.get("/contact", (req, res) => {
//   res.cookie("test", "aniket");
//   res.send("Hello world from contact");
// });

app.get("/signin", (req, res) => {
  res.send("Hello world from contact");
});

app.get("/signup", (req, res) => {
  res.send("Hello world from contact");
});

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
