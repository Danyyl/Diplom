import * as Actions from './authConstants';

const initialState = {
    loading: false,
    isLogged: null,
    user: null,
    isError: null,
};

const authReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.LOGIN:{
            return {
                ...state,
                isLogged: true,
                user: {...action.payload.user, refreshSessions: undefined, roles: undefined},
            }
        }
        case Actions.SET_TOKEN:{
            console.log(action.payload);
            return {
                ...state,
                token: action.payload
            }
        }
        case Actions.SET_USER:{
            return {
                ...state,
                user: action.payload
            }
        }
        case Actions.SET_USERS:{
            return {
                ...state,
                users: action.payload
            }
        }
        case Actions.SET_COMPANY:{
            return {
                ...state,
                company: action.payload
            }
        }
        case Actions.SET_TEMP_USER:{
            return {
                ...state,
                temp_user: action.payload
            }
        }
        case Actions.SET_SERVICE:{
            return {
                ...state,
                service: action.payload
            }
        }
        case Actions.SET_ALL_SERVICES:{
            return {
                ...state,
                services: action.payload
            }
        }
        case Actions.SET_ALL_COMPANIES:{
            return {
                ...state,
                companies: action.payload
            }
        }
        default: {
            return state;
        }
    }

}

export default authReducer;