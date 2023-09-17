
import React, { createContext, useEffect } from 'react'

import fetchBranch from '@/utils/fetchBranch'
import { useQuery } from "@tanstack/react-query"
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function BranchDetails({mydata}) {
    
    const {name}=mydata
   
    
    const branchQuery=useQuery({
        queryKey:['branches',name],
        queryFn:()=>fetchBranch(name),
        
    })
   
    const { data: session, status } = useSession();

    if(status==='authenticated'){
        return (
            <div className='branch_container'>
                {branchQuery?.data?.map((itr,index)=>{
                    return (
                        <h3 key={index}className='branch_names'><Link href={`/pages/repos/${index}/${name}`}
                            
                          
                        >{itr.name}</Link></h3>
                    )
                })}
        
            </div>
          )
         

    }
    if(branchQuery.isLoading){
        return <h1>Loading Data</h1>

    }
    if(branchQuery.isError){
        return<h1>Errors in branch query {JSON.stringify(branchQuery.error)}</h1>

    }

}
