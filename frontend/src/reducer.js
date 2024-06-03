const reducer = (state, action) => {
    switch (action.type){
        case "SET_LOADING":
            return {
                ...state,
                isLoading: true
            };
        case "GET_DATA":
            return {
                ...state,
                isLoading: false,
                hits: action.payload.hits,
                nbPages: action.payload.nbPages,
            };
        case "GET_DATA_S":
            return {
                ...state,
                isLoading: false,
                hitsS: action.payload.hitsS,
            };
        case "REMOVE_POST":
            return {
                ...state,
                hits: state.hits.filter(curEl => curEl.objectID !== action.payload)
            };
        case "SEARCH_QUERY":
            return {
                ...state,
                query: action.payload
            };
        case "SEARCH_MONTH":
            return {
                ...state,
                month: action.payload,
            };
        case "PREV_PAGE":
            let prevPageNum = state.page-1;
            if(prevPageNum<=0){
                prevPageNum=1;
            }
            return {
                ...state,
                page: prevPageNum,
            }
        case "NEXT_PAGE":
            let nextPageNum = state.page+1;
            if(nextPageNum>=7){
                nextPageNum=1;
            }
            return {
                ...state,
                page: nextPageNum,
            }
    }
    return state;
}

export default reducer;