// import { } from "../redux-actions/types";
const initialState = {
    posts:[],
    message:"",
    status:"",
    
}
const postReducer = (state= initialState , action )=>{
switch (action.type) {
    case "GET_POSTS":
            // localStorage.removeItem("token")
            // localStorage.removeItem("isLogged")
        return {...state,
           posts :  action.payload.posts,
           message : action.payload.message
         }  ;
    case "UPLOAD_POST":
        return{
            ...state,
            message : action.payload.message,
            status : action.payload.status
        }
    case "DELETE_POST":
        return{
            ...state,
            message : action.payload.message,
            status : action.payload.status
        }
    case "UPDATE_POST_LIKES":
        return{
            ...state,
            message : action.payload.message,
            status : action.payload.status
        }
    case "RESET_POST":
        return{
            ...state,
            message : "",
            status : ""
        }
    case "CLEAR_STATUS":
        return{
            ...state,
            message :"",
            status :""
        }
    
    // case LOGIN_USER:
    //      localStorage.setItem("token" , action.payload.token)
    //      localStorage.setItem("isLogged" , action.payload.isLogged)
    //     return {...state,
    //         user:  action.payload.user ,
    //         message: action.payload.message,
    //         status: action.payload.status,
    //         isLogged: action.payload.isLogged
    //     } ;
    // case CLEAR_USER_INFO :
    //     return{...state,
    //         message:"",
    //         status:""
    //     }
    //     case "PAGE_TRANSFER":
    //         return{...state,
    //             isRegistred: !state.isRegistred
    //         }
    // // case GET_USER:
    // //     return {...state} ;
    
    // // case LOADING_USER:
    // //     return {...state,
    // //     loading : true} ;
    
    default:
        return state;
}
}
export default postReducer;