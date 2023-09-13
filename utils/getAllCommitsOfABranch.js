 import axios from 'axios'
 const getAllCommits=async(url)=>{
    const allCommits= await axios.get(url)
    .then(res=>res.data)
    .catch(err=>console.log(err,'error in fetching all commits'))
    return allCommits
}
export default getAllCommits