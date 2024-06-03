import React from 'react'
import { useGlobalContext } from "./context"

const Statistics = () => {
  const {hitsS, isLoading, month } = useGlobalContext();
  const {totalSaleAmount, totalSoldItems, totalNotSoldItems} = hitsS;
  if(isLoading){
      return (
          <>
              <h1>Loading...</h1>
          </>
      )
  }
  return (
    <div className='flex-div'>
        <table style={{width:400, textAlign:'left'}}>
          <caption style={{padding:20}}><h2>Transctions Statistics - {month.toUpperCase()}</h2></caption>
          <tbody>
          <tr>
            <th>Total sale</th>
            <td style={{width:100}}>{totalSaleAmount}</td>
          </tr>
          <tr>
            <th>Total sold items</th>
            <td>{totalSoldItems}</td>
          </tr>
          <tr>
            <th>Total not sold items</th>
            <td>{totalNotSoldItems}</td>
          </tr>
          </tbody>
        </table>
      </div>
  )
}

export default Statistics