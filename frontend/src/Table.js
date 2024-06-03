import React, { useEffect } from 'react'
import { useGlobalContext } from './context'
import Search from './Search';

const Table = () => {
    const {hits, isLoading } = useGlobalContext();
    if(isLoading){
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    }
    return (
        <>
            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Sold</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            hits.map((data) => {
                                const {id, title, description, price, category, dateOfSale, image} = data;
                                return (
                                    <tr key={id}>
                                        <td>{id}</td>
                                        <td>{title}</td>
                                        <td>{description}</td>
                                        <td>{price}</td>
                                        <td>{category}</td>
                                        <td>{dateOfSale.slice(0, 10)}</td>
                                        <td><img src={image} alt={title} className='img'/></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table