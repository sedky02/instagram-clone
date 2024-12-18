import axios from "axios";


const url_post = "http://localhost:5000/api/posts/";

export const getPosts =  (token) => dispatch => {
    axios.get(url_post,{
        headers:{
            "Access-Control-Allow-Origin" :  "*",
            'content-type': 'application/json',
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods" : "GET,HEAD,OPTIONS,POST,PUT" ,
            "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
            'auth-token' :  token
        }
    }
    )
      .then(res => {
          dispatch({
            type : "GET_POSTS",
            payload: res.data
        })
      })
      .catch(err => {
        console.log(err)
         dispatch({
            type : "GET_POSTS",
            payload: err
        })
      })
    console.log("bla bla bla")
};
export const addPost =  (token, data) => dispatch => {
    axios({
        method: "post",
        url:`${url_post}upload/` ,
        headers: {
            "Access-Control-Allow-Origin" :  "*",
            'content-type': 'application/json',
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods" : "GET,HEAD,OPTIONS,POST,PUT" ,
            "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
            'auth-token' :  token
        },
        data: data
    })
      .then(res => {
          dispatch({
            type : "UPLOAD_POST",
            payload: res.data
        })
      })
      .catch(err => {

         dispatch({
            type : "UPLOAD_POST",
            payload: err
        })
      })
};
export const likePost =  (token, data) => dispatch => {
    axios({
        method: "put",
        url:`${url_post}update/likes` ,
        headers: {
            "Access-Control-Allow-Origin" :  "*",
            'content-type': 'application/json',
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods" : "GET,HEAD,OPTIONS,POST,PUT" ,
            "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
            'auth-token' :  token
        },
        data: data
    })
      .then(res => {
        
          dispatch({
            type : "UPDATE_POST_LIKES",
            payload: res.data
        })
      })
      .catch(err => {

         dispatch({
            type : "UPDATE_POST_LIKES",
            payload: err
        })
      })
};
export const deletePost =  (token,  id) => dispatch => {
    axios({
        method: "delete",
        url:`${url_post}delete` ,
        headers: {
            "Access-Control-Allow-Origin" :  "*",
            'content-type': 'application/json',
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods" : "GET,HEAD,OPTIONS,POST,PUT" ,
            "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
            'auth-token' :  token
        },
        data : {id: id}
        
    })
      .then(res => {
          dispatch({
            type : "DELETE_POST",
            payload: res.data
        })
      })
      .catch(err => {

         dispatch({
            type : "DELETE_POST",
            payload: err
        })
      })
};
  
export const resetInfo =()=>{
  return{
      type:"RESET_POST"
  }
}