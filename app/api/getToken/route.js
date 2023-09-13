import { NextResponse } from "next/server"

export async function GET(request){
    
    
    console.log(request.query,'code code code ')
    return NextResponse.json({message:'success'})
 

}