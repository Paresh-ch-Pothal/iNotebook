const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');  //to import the bcrypt js
const jwt = require('jsonwebtoken'); //used to import the jsonwentoken
const fetchuser=require('../middleware/fetchuser')
const JWT_secret="Harrybhaigreat!";

// :::::: Signup function
//Route-1: create a user using: POST '/api/auth/createuser' Doesnot require authorization ::: here no login required 
router.post('/createuser', [
  body('password', "Enter a valid Password: ").isLength({ min: 5 }),
  body('name', "Enter a valid Name: ").isLength({ min: 3 }),
  body('email', "Enter a valid Email: ").isEmail()

], async (req, res) => {  //req: request and res: response
  // console.log(req.body);
  // const user=User(req.body);
  // user.save();
  const success=false;


  //if there are errors and then show Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success: success, errors: errors.array() });
  }

  //check whether the user with the email already exist
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      return res.status(400).json({success: success, errors: "Already a user exist with the same email id" });
    }


    //creating a new user
    const salt= await bcrypt.genSalt(10);
    const Secpass= await bcrypt.hash(req.body.password,salt);
    user = await User.create({
      name: req.body.name,
      password: Secpass,
      email: req.body.email,
    })
    // .then(user => res.json(user))
    // .catch(error=>{console.log(error)
    //   res.json({error: "Enter a vlaid email" ,message: error.message})
    // });
    // res.send(req.body);

    //used to send a token to the user
    const data={
      user:{
        id: user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_secret); //it is a synchronius function so no need to add await here
    // console.log(jwtdata);
    // res.json(authtoken)  //it only shows the token
    res.json({success: true,authtoken: authtoken}) //it shows the token like this authtoken: "................."


    //catching the error
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error has been occured")
  }

})


// :::::: Login function
//Route-2: Authenticating a user using: POST '/api/auth/login' ::: here no login required
router.post('/login', [
  body('email', "Enter a valid Email: ").isEmail(),
  body('password', "Password cannot be blanked").exists()

], async (req, res) => { 
  let success=false;
  //if there are errors and then show Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email,password}=req.body;
  try {
    let user=await User.findOne({email: req.body.email});
    if(!user){
      return res.status(400).json({error: "Please try to login with correct information"});
    }
    const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      return res.status(400).json({error: "Please try to login with correct information"});
    }

    const data={
      user: {
        id: user.id
      }
    }

    const authtoken=jwt.sign(data,JWT_secret);
    success=true;
    res.json({success: success,authtoken: authtoken});
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal fault")
  }

})

//Route-3: Get loggedin user using : POST '/api/auth/getuser' ::: here login required
router.post('/getuser',fetchuser, async (req, res) => { 
try {
  const userid=req.user.id;
  const user=await User.findById(userid).select("-password");  //here it means we select everythings except the password
  res.send(user);
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal fault")
}
})

module.exports = router;