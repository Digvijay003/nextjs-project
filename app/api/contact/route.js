import myModelsForContacts from "@/models/ContactModels"
import connectDB from "@/mongoDB/connectDB"
import { NextResponse } from "next/server"


export  async function POST(request){

  
    try{
        await connectDB()
        const {data}=await request.json()
        const {email}=data

        const userExists=await myModelsForContacts.findOne({email})

        if(userExists){
            throw new Error("user already exists")
            
        }
     
        await myModelsForContacts.create({
            email
           })

    return NextResponse.json({message:"success"},{status:201})

    }
    catch(err){
        return NextResponse.json({message:err+'contact form errors'})
    }
    
}