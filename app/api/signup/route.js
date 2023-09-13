import myModelForLogin from '@/models/SignUpModels'
import connectDB from '@/mongoDB/connectDB'

import { NextResponse } from 'next/server'



export  async function POST(request) {
 try{
   await connectDB()
   const {formData}=await request.json()
  
   const {name,email,password,confirmPassword}=formData
   const userExist=await myModelForLogin.findOne({email})
   if(userExist){
    throw new Error("user already exists")
   
   }
   else {
    if(password.length<6){
      throw new Error('password should be greater than 6 characetrs')
      
     }
   

     await myModelForLogin.create(
      {
      name,
      email,
      password,
      confirmPassword
    })
    return NextResponse.json({message:"data sent ok to mongoDB"},{status:201})

   }

 }catch(err){
    console.log(err,'some error occurs in signup process')
 }
}
