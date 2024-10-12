const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

require("dotenv").config()
const config=require("./config.json")
const mongoose=require("mongoose")

mongoose.connect(config.connectionString)



const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");
const  User  = require("./models/user.model");



app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.post("/create-account", async (req, res) => {
  
  const { username, email, password } = req.body;

  if (!username) {
    return res.status(400).json({
      error: true,
      msg: "username required",
    });
  }

  if (!email) {
    return res.status(400).json({
      error: true,
      msg: "email required",
    });
  }

  if (!password) {
    return res.status(400).json({
      error: true,
      msg: "password required",
    });
  }

  const existingUser = await user.findOne({ email: email });
  if (existingUser) {
    return res.json({
      error: true,
      msg: "User already exists",
    });
  }

  const u = new User({
    username,
    email,
    password,
  });
  await u.save();

  const accessToken = jwt.sign(
    { u },
    process.env.SECRET_TOKEN,
    { expiresIn: "3600m" }
  );

  return res.json({
    error: false,
    u,
    accessToken,
    msg: "Registration successful",
  });
});

app.post("/login",async(req,res)=>{
  const {email,password}=req.body

  if(!email){
    return res.status(400).json({
      msg:"Email is required"
    })
  }
  if(!password){
    return res.status(400).json({
      msg:"password is required"
    })
  }
 const 

})

app.listen(8000);

module.exports = app;
