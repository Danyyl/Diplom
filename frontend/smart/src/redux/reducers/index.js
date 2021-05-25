import { combineReducers } from 'redux';
import authReducer from "./auth/authReducer";

const rootReducer = combineReducers({
     authReducer,
});

export default rootReducer;