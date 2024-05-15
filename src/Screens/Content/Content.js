import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ActionTypes from "../../Store/ActionTypes";
import SearchList from "../../Components/SearchList/SearchList";

import './Content.css';

const Content = () => {
    const authenticatedPerson = useSelector((state) => state.authenticatedPerson);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch({ type: ActionTypes.SIGNOUT });
    }

    return (
        <div className='content-box'>
            <div className='content-header'>
                <div>Welcome back {authenticatedPerson.name}</div>
                <div className='content-logout' onClick={logout}>EXIT</div>
            </div>
            <div className='content-body'>
                <div className='content-img-box'>
                </div>
                <SearchList />
            </div>
        </div>
    );
}

export default Content;