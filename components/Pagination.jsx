import React, { useEffect, useState } from 'react'
import Items from './Items'
import ReactPaginate from 'react-paginate';

import { useColorMode } from '@chakra-ui/react';



export default function Pagination({itemsPerPage,items}) {
    const [currentItems,setCurrentItems]=useState([])
    const [pageCount,setPageCount]=useState(0)

    const [itemOffSet,setItemOffSet]=useState(0)
    const {colorMode}=useColorMode

    useEffect(()=>{

        const endOffSet=itemOffSet+itemsPerPage
        setCurrentItems(items.slice(itemOffSet, endOffSet));
        setPageCount(Math.ceil(items.length / itemsPerPage));

    },[itemOffSet,itemsPerPage])

    const handlePageClick = (event) => {
      
        const newOffset = event.selected * itemsPerPage % items.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffSet(newOffset);
      };

  return (
    <div>
        <Items currentItems={currentItems}/>
           <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName={colorMode==='dark'?'pagination__link_light':'pagination__link'}
        nextClassName="page-item"
        nextLinkClassName={colorMode==='dark'?'pagination__link_light':'pagination__link'}
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName={colorMode==='dark'?'pagination bg-slate-200':'pagination'}
        activeClassName={colorMode==='dark'?'pagination__link__active_light':'pagination__link__active'}
        renderOnZeroPageCount={null}
      />

    </div>
  )
}
