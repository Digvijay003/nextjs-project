"use client"


import { QueryClient,QueryClientProvider} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const newClient=new QueryClient()

export  const ReactQueryProvider=({children})=>{

    return (
        <QueryClientProvider client={newClient}>
            {children}
            <ReactQueryDevtools/>

        </QueryClientProvider>
    )

}
