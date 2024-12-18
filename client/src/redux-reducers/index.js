import {combineReducers} from 'redux';
import pageReducer from './pages';
import userReducer from './users';
import postReducer from './posts';

const allReducers = combineReducers({
    pageReducer,
    userReducer,
    postReducer
})
export default allReducers;