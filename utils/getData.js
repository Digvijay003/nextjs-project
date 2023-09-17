import axios from "axios"
import { redirect } from 'next/navigation'

export default async function getRepos(token){
  console.log(token,'seriously check this')
    
  const repos=await axios.get('https://api.github.com/user/repos',{
    headers:{
      Authorization: `Bearer ${token}`,
      "Content-Type":"application/json"
    }

  })
  .then(res=>res.data)
  .catch(err=>{
   console.log(err,'what is this error')
  })
 
  return repos
    


  }




