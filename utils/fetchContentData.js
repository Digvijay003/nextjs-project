import axios from 'axios'

export default async function fetchContentData(name){
    const getContentdata=await axios.get(`https://api.github.com/repos/Digvijay003/${name}/contents`)
    .then(res=>(res.data))
    .catch(err=>console.log(err,'error'))

    return getContentdata

}
