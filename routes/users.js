import express  from "express"
import { genPassword , createUser , getUserByName } from '../helper.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const router = express.Router(); //express router library

//register
router.post('/register',async (req,res)=>{ 
    const{username,password} = req.body
    console.log(username,password)
    //validate username/email already present in DB
   const isUserExist=await getUserByName(username)
   console.log(isUserExist)
   if(isUserExist){
    res.status(400).send({message: "User already exist"})
    return;
   }  
   if(!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/g.test(password)){
    res.status(400).send({message: "Password pattern does not match"})
    return
   }
   const hashedPassword = await genPassword(password);
  const result= await createUser(username,hashedPassword)
   res.send(result)
   })

   //login
   router.post('/login',async (req,res)=>{ 
    const{username,password} = req.body
    console.log(username,password)
    //validate username/email already present in DB
   const userFromDB=await getUserByName(username)
   console.log(userFromDB)
   if(!userFromDB){
    res.status(400).send({message: "Invalid credentials"})
    return;
   }  
  const storedPassword= userFromDB.password;
  console.log(storedPassword)
 const isPasswordMatch=await bcrypt.compare(password,storedPassword)
 console.log(isPasswordMatch)
 if(!isPasswordMatch){
    res.status(400).send({message: "Invalid credentials"})
    return;
   }  
   //generate token if login is valid
    const token=jwt.sign({id:userFromDB._id},process.env.SECRET_KEY)
    console.log(token)
    res.send({message:"Successfully logged in" , token:token})
   })

   export const userRouter = router