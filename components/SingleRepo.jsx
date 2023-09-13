
import React, { useEffect, useState } from 'react'

import Pagination from './Pagination'
import { Badge, Box, Button, ButtonGroup, Flex, IconButton, Progress, Text, useColorMode } from '@chakra-ui/react';
import Link from 'next/link';
import { StarIcon } from '@chakra-ui/icons';




export default function SingleRepo({repos}) {
  const nextPageDisabled=Math.ceil((repos?.length)/3)
  const {colorMode} =useColorMode()

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage=3
  useEffect(()=>{
    
    console.log(repos,'repos ')

  },[repos])

const handlePageChange = (selectedPage) => {
  console.log(selectedPage,'page dekho')
  
  setCurrentPage(selectedPage);
  
};
const startIndex=(currentPage)*itemsPerPage
const endIndex=startIndex+itemsPerPage
const subsets=repos?.slice(startIndex,endIndex)

function convertDate(date){
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    second: 'numeric', 
    timeZoneName: 'short' 
  };
  const dateObj = new Date(date)

  const formatedDate=dateObj.toLocaleDateString(undefined,options)
  return formatedDate

}


   

// function toggleStarFunctionality(){
// setNewData((prevData)=>{
//   const newDataWithId=prevData.map((item,index)=>{
//     return {
//       ...item,
//       id:index+1
//     }
  
//   })
//   return newDataWithId
// })
//  console.log(newData,'newDatawithId')
 

  
// }
  

  
    return (<div className='each_repo_div'>

{subsets?.map((itr,index)=>{
 
   
    return <>
    <div className='custom_scrollbar'key={index}>
      <div id='selected_repo_div'className=''>
           <Flex className='each_repo_details'>
           <Box ml='3'>
       <Link className={colorMode==='dark'?'text-blue-300 repo_heading':'text-blue-600 repo_heading'}fontSize='3xl'href={`/pages/repos/${itr.id}`}>
        {itr.name}
          <Badge ml='5' colorScheme='blue'>
           Default
         </Badge>
    </Link>
       <Text fontSize='xl'className='mr-5'>{itr.description}</Text>
       <Text fontSize='sm'>Updated on {convertDate(itr.updated_at)}</Text>
       
     </Box>
                
    
  <ButtonGroup size='sm' isAttached variant='outline' className='mt-8'>
      <Button className={colorMode==='dark'?'bg-slate-500 text-slate-300 ':'bg-zinc-100 text-slate-200'}>Star</Button>
  <IconButton  icon={<StarIcon/>} size='sm'className={colorMode==='dark'?'bg-slate-500 text-slate-300 ':'bg-zinc-100 text-slate-200'}/>
   </ButtonGroup>
    </Flex>
    </div>

  <Progress value={100} size='xs' colorScheme='light-blue' className='mt-5 progress_bar'/>
 
    </div>
   
 </>
})}
<>
 <Button
 onClick={()=>handlePageChange(currentPage-1)}
 isDisabled={currentPage===0}
 className='pagination_button'
 colorScheme='blue'
 >
  Previous Page

 </Button>
 <Button
 onClick={()=>handlePageChange(currentPage+1)}
 isDisabled={currentPage===nextPageDisabled}
 colorScheme='blue'

 className={colorMode==='dark'?'.pagination_button bg-sky-500 text-slate-800':'pagination_button'}
 
 >
  Next Page

 </Button>
 </>

 {/* <div>
  <Pagination itemsPerPage={3}items={repos}/>
 </div> */}

    </div>)
 
}
