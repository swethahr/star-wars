import ActionTypes from './ActionTypes';

const initialState = {
    loginData: [],
    searchDataArray: [],
    itemData: [],
    isAuthenticated: false,
    isAdmin: false,
    authenticatedPerson: {}
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SIGNIN:
            const { loginData, isAuth, isAdmin, authPerson } = action.payload;
            return {
                ...state,
                loginData: loginData,
                isAuthenticated: isAuth,
                isAdmin: isAdmin,
                authenticatedPerson: authPerson,
            };
        case ActionTypes.SIGNOUT:
            return {
                ...initialState
            }
        case ActionTypes.SEARCH_LIST:
            return {
                ...state,
                searchDataArray: action.searchData,
            }
        case ActionTypes.FETCH_ITEM_DATA:
            return {
                ...state,
                searchDataArray: [],
                itemData: action.itemData,
            }
        default:
            return state;
    }
}

export default dataReducer;