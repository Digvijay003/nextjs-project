"use client"
import React, { useEffect } from 'react'
import axios from 'axios'

export default function Htmlpage() {
    useEffect(()=>{
        async function getData(){
            const res=await axios.get('https://github.com/Digvijay003/nextjs-project/commit/48b6e1b083062ec2ca7bc324042914e05de81105')
            .then(res=>(res.data))
            .then(res=>console.log(res))
            .catch(err=>console.log(err,'some errors here came'))
            return res

        }
        getData()
    })
  return (
    <div>
        Let see this also

    </div>
  )
}
