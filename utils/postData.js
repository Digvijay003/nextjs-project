import axios from 'axios'

export default async function postToGithub(repository,endpoints,data,token){
    try{
        const url = `https://api.github.com/repos/Digvijay003/${repository}/${endpoints}`;
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          };
          const response = await axios.post(url, data, { headers });
          return response.data

    }
    catch(err){
        throw new Error('Failed To Post Data'+err)

    }


}

