"use client"

import React, { useState,useEffect } from 'react'

export default function ClientComponent({somevalue}) {
    const [value,setValue]=useState('')
    useEffect(()=>{
        setValue(somevalue)

    },[])
  return (
    <div>
       
        <h1>Value coming from server Component </h1>
        <span>{value}</span>
    </div>
  )
}
