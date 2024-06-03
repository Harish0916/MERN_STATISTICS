import React from 'react'
import './App.css'
import Search from './Search'
import Pagination from './Pagination'
import Table from './Table'
import Statistics from './Statistics'
import Barchart from './Barchart'

const App = () => {
  return (
    <>
      <div className='flex-div'>
        <div className='round-title'>Transaction dashborad</div>
        <Search/>
        <Table />
        <Pagination />
      </div>
      <Statistics/>
      <Barchart/>
    </>
  )
}

export default App