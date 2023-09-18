
import { TriangleDownIcon } from '@chakra-ui/icons'
import { Badge, Box, Button, ButtonGroup, Flex, IconButton, Progress, Spacer, Text, useColorMode } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'


export default function Items({currentItems}) {
    const { colorMode} = useColorMode()

    return (<div className='each_repo_div'>

        {currentItems?.map((itr,index)=>{
           
            return <>
            <div className='custom_scrollbar'key={index}>
              <div id='selected_repo_div'className=''>
                   <Flex className='each_repo_details'>
                   <Box ml='3'>
               <Link className={colorMode==='dark'?'text-blue-300 repo_heading':'text-blue-600 repo_heading'}fontSize='3xl'href={`/pages/repos/${itr.id}`}>
                {itr.name}
                  <Badge ml='5' colorScheme='blue.500'>
                   Default
                 </Badge>
            </Link>
               <Text fontSize='xl'className='mr-5'>{itr.description}</Text>
               <Text fontSize='sm'>Updated on {(itr.updated_at)}</Text>
               
             </Box>
                        
             <Spacer />
          <ButtonGroup size='sm' isAttached variant='outline'>
              <Button className={colorMode==='dark'?'bg-slate-500 text-slate-300 ':'bg-zinc-100 text-slate-200'}>{"Star"}</Button>
          <IconButton  icon={<TriangleDownIcon />} size='sm'cclassName={colorMode==='dark'?'bg-slate-500 text-slate-300 ':'bg-zinc-500 text-slate-200'}/>
           </ButtonGroup>
            </Flex>
            </div>
         
          <Progress value={100} size='xs' colorScheme='light-blue' className='mt-5 progress_bar'/>
         
            </div>
           
         </>
        })}

            </div>)
}
