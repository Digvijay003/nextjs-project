import axios from 'axios'

export default async function getTreeStructure(url){
    const treeData=await axios.get(url).then(res=>res.data).catch(err=>console.log(err,'error in getting tree data'))
    return treeData
}