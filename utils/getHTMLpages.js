import axios from "axios"

export default async function getHTMLPages(url){
    const htmlData=await axios.get(url).then(res=>res.data).catch(err=>console.log(err,'error in getting html pages'))
    return htmlData
}