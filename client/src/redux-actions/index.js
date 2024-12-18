import axios from "axios";
import { REGISTER_USER, LOGIN_USER, GET_USER, LOADING_USER, CLEAR_USER, CLEAR_USER_INFO } from "./types";

const url = "http://localhost:5000/api/users/";
export const registerUser =  (userData) => dispatch => {
    axios({
        method: "post",
        url: `${url}register/`,
        headers: {
            "Access-Control-Allow-Origin" :  "*",
            'content-type': 'application/json',
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods" : "GET,HEAD,OPTIONS,POST,PUT" ,
            "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
        },
        data: userData
    })
      .then(res => {
          dispatch({
            type : REGISTER_USER,
            payload: res.data
        })
      })
      .catch(err => {
         dispatch({
            type : REGISTER_USER,
            payload: err
        })
      })
};
export const loginUser =  (user) => dispatch => {
    axios({
        method: "post",
        url:`${url}login/` ,
        headers: {
            "Access-Control-Allow-Origin" :  "*",
            'content-type': 'application/json',
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods" : "GET,HEAD,OPTIONS,POST,PUT" ,
            "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
        },
        data: user
    })
       
      .then(res => {
          dispatch({
            type : LOGIN_USER,
            payload: res.data
        })
      })
      .catch(err => {

         dispatch({
            type : LOGIN_USER,
            payload: err
        })
      })
};


export const  transferPage= () => {
    return {
        type: "PAGE_TRANSFER"
    }
}
export const  LogOut= () => {
    return {
        type: "LOGOUT"
    }
}
export const  clearInfo= () => {
    return {
        type: CLEAR_USER_INFO
    }
}
export const  clearPost= () => {
    return {
        type: "CLEAR_STATUS"
    }
}
export const darker = ()=>{
    return{
        type:'darker'
    };
};

