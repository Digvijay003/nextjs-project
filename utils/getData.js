import axios from "axios"
import { redirect } from 'next/navigation'

export default async function getRepos(token){
    
  const repos=await axios.get('https://api.github.com/user/repos',{
    headers:{
      Authorization: `Bearer ${token}`
    }

  })
  .then(res=>res.data)
  .catch(err=>{
   console.log(err)
  })
 
  return repos
    


  }




