import axios from "axios";

export async function sendEmailToDb(email){
    const headers={
        'Content-Type':'application/json'

    }
    const data={email }
   
    try{
        const res=await axios.post('http://localhost:3000/api/emailToDb',data,{headers})

        console.log(res,'see this response honey singh')
        return res
        

    }catch(error){
        console.log(error,'what is error')
        return null

    }
   
  
    
}