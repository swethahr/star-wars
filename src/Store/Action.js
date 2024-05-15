import axios from "axios";
import ActionTypes from "./ActionTypes"

const signinDisp = (data, name, pass) => {
    let isAuth = false;
    let isAdmin = false;

    const authPerson = data.filter(el => {
        if(el.name === name && pass === el.birth_year) {
            isAuth = true;
            if(el.name === "Luke Skywalker") {
                isAdmin = true;
            }
        }
        return el.name === name && pass === el.birth_year;
    });

    return {
        type: ActionTypes.SIGNIN,
        payload: {
            loginData: data,
            isAuth: isAuth,
            isAdmin: isAdmin,
            authPerson: authPerson[0]
        }
    }
}

const searchListDisp = (data) => {
    return {
        type: ActionTypes.SEARCH_LIST,
        searchData: data
    }
}

const fetchItemDataDisp = (data) => {
    return {
        type: ActionTypes.FETCH_ITEM_DATA,
        itemData: data
    }
}

export const signin = (userName, password) => {
    return (dispatch, getState) => {
        const { loginData } = getState();

        if(loginData.length === 0) {
            axios.get('https://swapi.dev/api/people/')
                .then(res => {
                    return dispatch(signinDisp(res.data.results, userName, password));
                })
                .then(err => console.log(err))
        } else {
            dispatch(signinDisp(loginData, userName, password));
        }
    }
}

export const searchList = (searchValue) => {
    return (dispatch, getState) => {
        axios.get(`https://swapi.dev/api/planets/?search=${searchValue}`)
            .then(res => {
                const resFin = res.data.results.map(el => el.population === 'unknown' ? {...el, population: 0} : el);
                return dispatch(searchListDisp(resFin));
            })
            .then(err => console.log(err))
    }
}

export const fetchItemData = (item) => {
    return dispatch => {
        axios.get(item.url)
            .then(res => {
                return dispatch(fetchItemDataDisp(res));
            })
            .then(err => console.log(err))
    }
}
