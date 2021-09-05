import { REGISTER_USER, LOGIN_USER , GET_USER , LOADING_USER} from "../redux-actions/types";
const initialState = {
    users: [],
    loading : false
}
const userReducer = (state= initialState , action )=>{
switch (action.type) {
    case REGISTER_USER:
            
        return {...state,
            users: [ ...state.users, action.payload],
            loading: false
        } ;
    
    case LOGIN_USER:

        return {...state,
            users: [ ...state.users, action.payload],
            loading: false
        } ;

    case GET_USER:
        return {...state} ;
    
    case LOADING_USER:
        return {...state,
        loading : true} ;
    
    default:
        return state;
}
}
export default userReducer;