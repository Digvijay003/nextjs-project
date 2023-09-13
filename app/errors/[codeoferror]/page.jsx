"use client"
import { useSession } from 'next-auth/react'
import { redirect, useParams } from 'next/navigation'
import React from 'react'

export default function Errors() {
    const params=useParams()
    const {status}=useSession()

    if(status==='unauthenticated'){
      redirect('/')
    }
   
  return (
    <div>
        <h1>Error Page with status code {params.codeoferror}</h1>
    </div>
  )
}
