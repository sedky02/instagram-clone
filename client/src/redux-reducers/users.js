import { REGISTER_USER, LOGIN_USER , GET_USER , LOADING_USER, CLEAR_USER_INFO} from "../redux-actions/types";
const initialState = {
    user:{
        _id: localStorage.getItem("id"),
        name: localStorage.getItem("name"),
        username: localStorage.getItem("username"),
        email: localStorage.getItem("email")
    },
    message:"",
    status:"",
    isLogged: localStorage.getItem('isLogged'),
    isRegistred: true,
    token :localStorage.getItem('token')
}
const userReducer = (state= initialState , action )=>{
switch (action.type) {
    case REGISTER_USER:
            
        return {...state,
            message: action.payload.message,
            status: action.payload.status,
            isRegistred : true
         }  ;
    
    case LOGIN_USER:
        localStorage.setItem("token" , action.payload.token)
        localStorage.setItem("id",action.payload.user._id )
        localStorage.setItem("name",action.payload.user.name )
        localStorage.setItem("username",action.payload.user.username )
        localStorage.setItem("email",action.payload.user.email)
        localStorage.setItem("isLogged" , action.payload.isLogged)
        return {...state,
            user:  action.payload.user ,
            message: action.payload.message,
            status: action.payload.status,
            isLogged: action.payload.isLogged
        } ;
    case CLEAR_USER_INFO :
        return{...state,
            message:"",
            status:""
        }
    case "LOGOUT":
        localStorage.removeItem("token" )
        localStorage.removeItem("id")
        localStorage.removeItem("name")
        localStorage.removeItem("username")
        localStorage.removeItem("email")
        localStorage.removeItem("isLogged" )
        return {
            ...state,
            user: {},
            message:"",
            status:"",
            isLogged:false,
            isRegistred: true,
            token :null
        }
    case "PAGE_TRANSFER":
            return{...state,
                isRegistred: !state.isRegistred
            }
    // case GET_USER:
    //     return {...state} ;
    
    // case LOADING_USER:
    //     return {...state,
    //     loading : true} ;
    
    default:
        return state;
}
}
export default userReducer;