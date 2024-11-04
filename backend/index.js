const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Note=require("./models/note.model.js")

const config = require("./config.json");
const { createAccountSchema, loginSchema } = require("./validators/authValidators");
const { authenticateToken } = require("./utilities");
const User = require("./models/user.model");

mongoose.connect(config.connectionString);

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/get", (req, res) => {
  res.send("Welcome to the API");
});

app.post("/create-account", async (req, res) => {
  try {
    const validation = createAccountSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: true, msg: "invalid credentials" });
    }

    const { username, email, password } = validation.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: true, msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username:username, email, password: hashedPassword });
    await newUser.save();

    const accessToken = jwt.sign({id: newUser._id }, process.env.SECRET_TOKEN, { expiresIn: "3600m" });

    return res.json({ error: false, user: newUser, accessToken, msg: "Registration successful" });
  } catch (error) {
    return res.status(500).json({ error: true, msg: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {

  try {
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
      
      return res.status(400).json({ error: true, msg: validation.error.errors[0].message });
    }
   
    const { email, password } = validation.data;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: true, msg: "Invalid email or password" });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, { expiresIn: "3600m" });

    return res.json({ error: false, accessToken, msg: "Login successful" });
  } catch (error) {
    return res.status(500).json({ error: true, msg: "Internal server error" });
  }
});


app.get("/get-user", authenticateToken, async (req, res) => {
  const  user = req.user;
 
  
  const isUser = await User.findOne({ _id: user.id });

  if (!isUser) {
    return res.sendStatus(401); 
  }

  return res.json({
    user: {
      username: isUser.username,
      email: isUser.email,
      _id: isUser._id,
      createdOn: isUser.createdOn
    },
    message: ""
  });
});


app.post("/add-note",authenticateToken,async (req,res)=>{
  const{title,content,tags}=req.body;
  const user=req.user;

  if(!title){
    return res.status(400).json({error:true,message:"Title required"})
  }

  if(!content){
    return res.status(400).json({error:true,message:"Content required"})
  }

  try{
    
    const note=new Note({
     title,
     content,
     tags:tags || [],
     userId:user.id
    })
    await note.save()

    return res.json({
      error:false,
      note,
      message:"Note added successfully"
    })
  }
  catch(error){
    return res.status(500).json({
      error:true,
      message:"internal server error"
    })
  }
})

app.put("/edit-note/:noteId",authenticateToken,async (req,res)=>{
  const noteId=req.params.noteId
  const{title,content,tags,isPinned}=req.body;
  const user=req.user;

  if(!title){
    return res.status(400).json({error:true,message:"Title required"})
  }

  if(!content){
    return res.status(400).json({error:true,message:"Content required"})
  }

  try{
    const note=await Note.findOne({_id:noteId,userId:user.id})

    if(!note){
      return res.status(404).json({error:true,message:"Note not found"})
    }
    if(title)
      note.title=title;
    if(content)
      note.content=content
    if(tags)
      note.tags=tags
    if(isPinned)
      note.isPinned=isPinned

    await note.save()

    return res.json({
      error:false,
      note,
      message:"Note updated successfully"
    })
  }
  catch(error){
    return res.status(500).json({
      error:true,
      message:"Internal server error"
    })
  }
})

app.get("/get-all-notes", authenticateToken, async (req, res) => {
  const user  = req.user;
  try {
    const notes = await Note.find({
      userId: user.id
    }).sort({ isPinned: -1 });
    
    return res.status(200).json({
      notes:notes
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error"
    });
  }
});


app.delete("/delete-note/:noteId",authenticateToken,async(req,res)=>{
  const noteId=req.params.noteId;
  const user=req.user;

  try{
    const note=await Note.findOne({_id:noteId,userId:user.id})

    if(!note){
      return res.status(404).json({
        error:true,
        message:"Note not found"
      })
    }
    await Note.deleteOne({_id:noteId,userId:user.id})
    return res.json({
      error:false,
      message:"Note deleted successfully"

    })
  }
  catch(error){
    return res.status(500).json({
      error:true,
      message:"Internal server error"
    })
  }
})


app.put("/pinned-note/:noteId",authenticateToken,async(req,res)=>{
  const noteId=req.params.noteId
  const{isPinned}=req.body;
  const user=req.user;


  try{
    const note=await Note.findOne({_id:noteId,userId:user.id})

    if(!note){
      return res.status(404).json({error:true,message:"Note not found"})
    }
  
 
      note.isPinned=isPinned 

    await note.save()

    return res.json({
      error:false,
      note,
      message:"Note pinned successfully"
    })
  }
  catch(error){
    return res.status(500).json({
      error:true,
      message:"Internal server error"
    })
  }
})



app.get("/search-note",authenticateToken,async(req,res)=>{
 
  const user=req.user;
  const {query}=req.query;

  if(!query){
    return res.status(400).json({error:true,message:'Search query is required'})
  }

  try{
   const matchingNotes=await Note.find({
    userId:user.id,
    $or:[  
      {title:{$regex:new RegExp(query,"i")}},
      {content :{$regex:new RegExp(query,"i")}},
    ],
     })
  return res.json({
    error:false,
    notes:matchingNotes,
    message:"Notes matching the search query retreived successfully",
  })
}
     catch(error){
      return res.status(500).json({
        error:true,
        message:"Internal server error"
      })
     } 
  })

const PORT =  8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



module.exports = app;
