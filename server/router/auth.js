const jwt = require("jsonwebtoken");
const { response } = require("express");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

require("../db/conn");
const User = require("../models/userSchema");

router.get("/", (req, res) => {
  res.send("Hello world from server router js");
});

// Using promises
// router.post("/register", (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;

//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "Field cannot be incomplete" });
//   }

//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ error: "Email already Exist" });
//       }

//       const user = new User({
//         name,
//         email,
//         phone,
//         work,
//         password,
//         cpassword,
//       });

//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "user registered successfuly" });
//         })
//         .catch((err) =>
//           res.status(500).json({ error: "Failed to registered" })
//         );
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// Using async await
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Field cannot be incomplete" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already Exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password is not matching" });
    } else {
      const user = new User({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      });

      await user.save();
      res.status(201).json({ message: "user registered successfuly" });
    }
  } catch (err) {
    console.log(err);
  }
});

//login route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill the data" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatch) {
        res.status(400).json({ error: "invalid credentials pass" });
      } else {
        res.json({ message: "user Signin Successfully" });
      }
    } else {
      res.json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

// about us page
router.get("/about", authenticate, (req, res) => {
  res.send(req.rootUser);
});

// Logout page
router.get("/logout", (req, res) => {
  res.status(200).send("User Logout");
  res.clearCookie("jwtoken", { path: "/" });
});

module.exports = router;
