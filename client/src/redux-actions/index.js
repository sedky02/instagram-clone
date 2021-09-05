import axios from "axios";
import { REGISTER_USER, LOGIN_USER, GET_USER, LOADING_USER } from "./types";
const url = "http://localhost:5000/api/user/";
export const registerUser =  (userData) => dispatch => {
    dispatch(setLoading())
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
    dispatch(setLoading())
    axios({
        method: "post",
        url:`http://localhost:5000/api/user/login/` ,
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

export const  setLoading = () => {
    return {
        type: LOADING_USER
    }
}
export const darker = ()=>{
    return{
        type:'darker'
    };
};

