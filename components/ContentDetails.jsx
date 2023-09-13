
import React from 'react'
import fetchContentData from '@/utils/fetchContentData'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export default function ContentDetails({mydata}) {
  const {name}=mydata
  
  const contentQuery=useQuery({
    queryKey:["content",name],
    queryFn:()=>fetchContentData(name),
    
  })
 
  const{data:session,status}=useSession()
  if(contentQuery.isLoading){
    return <h1>Loading Data</h1>

  }
  if(contentQuery.isError){
    return<h1>Errors in content query</h1>

  }
  if(status==='authenticated'){
    return (
      <div>
       
          {contentQuery?.data[0]?.sha}
  
      </div>
    )

  }
   
  
}
