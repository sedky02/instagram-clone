import {combineReducers} from 'redux';
import darkReducer from './darker';
import userReducer from './users';

const allReducers = combineReducers({
    darkReducer,
    userReducer
})
export default allReducers;