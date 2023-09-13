import axios from 'axios'

export default async function fetchBranch(name){
    const response=await axios.get(`https://api.github.com/repos/Digvijay003/${name}/branches`)
    .then(res=>(res.data))
    .catch(err=>console.log(err))
    return response
 

}
