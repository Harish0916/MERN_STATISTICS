import React, { useContext, useReducer, useEffect }  from "react";
import reducer from './reducer';

const AppContext = React.createContext();

let API = 'http://localhost:5000/api/products';
let APIT = 'http://localhost:5000/api/combined-data';

const initialState = {
    isLoading: true,
    query: '',
    nbPages:6,
    page: 1,
    hits: [],
    hitsS: [],
    month:'march',
    totalSaleAmount:0,
    totalSoldItems:0,
    totalNotSoldItems:0,
}

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchApi = async (url) => {
        dispatch({type: 'SET_LOADING'})
        try {
            const res = await fetch(url);
            const data = await res.json();
            dispatch({
                type: 'GET_DATA',
                payload: {
                    hits: data,
                    nbPages: state.nbPages,
                }
            })
            // console.log(data);
        } catch (error) {
            console.log(error)
        }
    }
    const fetchApiS = async (url) => {
        dispatch({type: 'SET_LOADING'})
        try {
            const res = await fetch(url);
            const data = await res.json();
            dispatch({
                type: 'GET_DATA_S',
                payload: {
                    hitsS: data,
                }
            })
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }
    // console.log(state.totalNotSoldItems)
    const removePost = (post_ID) => {
        dispatch({type: "REMOVE_POST", payload:post_ID})
    }

    const searchPost = (text) => {
        dispatch({type: "SEARCH_QUERY", payload:text})
    }
    const searchByMonth = (bymonth) => {
        dispatch({type: "SEARCH_MONTH", payload:bymonth});
    }
    
    const getPrevPage = () => {
        dispatch({type: "PREV_PAGE"})
    }

    const getNextPage = () => {
        dispatch({type: "NEXT_PAGE"})
    }
    
    // fetch data as table
    useEffect(()=>{
        fetchApi(`${API}?search=${state.query}&page=${state.page}`)
    },[state.month, state.query, state.page]);

    // fetch statistics
    useEffect(()=>{
        fetchApiS(`${APIT}/${state.month}`)
    },[state.month]);
    
    return <AppContext.Provider value={{...state, removePost, searchPost,searchByMonth, getPrevPage, getNextPage}}>{children}</AppContext.Provider>
}

// custom hook

const useGlobalContext = () => {
    return useContext(AppContext);
}
export {AppContext, AppProvider, useGlobalContext};