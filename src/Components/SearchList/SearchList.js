import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../Hooks/useDebounce";
import { fetchItemData, searchList } from "../../Store/Action";
import ActionTypes from "../../Store/ActionTypes";
import './SearchList.css';



const SearchList = () => {
    const [searchText, setSearchText] = useState('');
    const [startTime, setStartTime] = useState('');
    const [apiCount, setApiCount] = useState(0);
    const searchDataArray = useSelector((state) => state.searchDataArray);
    const isAdmin = useSelector((state) => state.isAdmin);
    const dispatch = useDispatch();

    const debouncedSearchTerm = useDebounce(searchText, 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            if(!isAdmin) {
                if(startTime === '') {
                    setStartTime(new Date().getTime());
                }
                if((startTime === '' || ((new Date().getTime() - startTime) < 60000))) {
                    if(apiCount < 15) {
                        dispatch(searchList(debouncedSearchTerm));
                        setApiCount(apiCount + 1);
                    }
                } else {
                    setApiCount(0);
                    setStartTime('');
                }
            } else {
                dispatch(searchList(debouncedSearchTerm));
            }
        }
    },[debouncedSearchTerm]);

    useEffect(() => {
        if (searchText === '') {
            dispatch({type: ActionTypes.SEARCH_LIST, searchData: []});
        }
    },[searchText]);

    const searchValue = (e) => {
        setSearchText(e.target.value);
    }

    const listItemClicked = (item) => {
        dispatch(fetchItemData(item));
        setSearchText('');
    }
    
    const sortData = searchDataArray.length !== 0 ? searchDataArray.sort((a,b) => b.population - a.population) : [];
    const elem = sortData.length === 0 ? 
                null : 
                (searchDataArray.map((el, index) => 
                    <div 
                        key={el.name} 
                        className='content-search-items'
                        style={{
                            fontSize: `${12 + (sortData.length - index)}px`
                        }}
                        onClick={() => listItemClicked(el)}  
                    >
                        <div>
                            {el.name}
                        </div>
                        <div>
                            {el.population}
                        </div>
                    </div>
                ));

    return (
        <div className='content-search'>
            <input type='search' className='content-search-input' value={searchText} onChange={e => searchValue(e)} />
            <div className='content-search-list'>
                {elem}
            </div>
        </div>
    );
}

export default SearchList;