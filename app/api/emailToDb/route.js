import myModelsForEmail from "@/models/EmailToDbmodels";
import connectDB from "@/mongoDB/connectDB";
import { NextResponse } from "next/server";

export async function POST(request){
    try{
        await connectDB()
      
        const data=await request.json()

        const {email}=data

    
        console.log(email,'email')
       
    
        const UserExists=await myModelsForEmail.findOne({email})
        if(UserExists){
            return 
        }
        await myModelsForEmail.create({
            email
        })
    
        return NextResponse.json({message:"email saved in db succesffully"},{status:201})

    }
    catch(error){
        return NextResponse.json({message:'some error ocuurs '+error})
    }
   

}