import React from 'react';
import {useGlobalContext} from './context';

const Pagination = () => {
  const { page, nbPages, getPrevPage, getNextPage } = useGlobalContext();
  return (
    <>
      <div className='pagination-btn'>
        <h3>Page No: {page} </h3>
        <div>
          <button onClick={()=>getPrevPage()}>Previous</button>-
          <button onClick={()=>getNextPage()}>Next</button>
        </div>
        <h3>Per Page: 10</h3>
      </div>
    </>
  )
}

export default Pagination;