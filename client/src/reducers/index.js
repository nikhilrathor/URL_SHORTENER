import { combineReducers } from 'redux';
import urlReducer from './urlReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    url: urlReducer,
    error: errorReducer,
    auth: authReducer
});