import React, { useEffect, useState } from 'react'
import "./style.scss"
import {useSelector, useDispatch} from "react-redux";
import profil from "../navigation/images/profile-pic.jpg";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addPost } from '../../redux-actions/postsAction';
import axios from "axios";
import LoadingDots from "./imgs/loading-dots.gif";
import Picker from "emoji-picker-react";
import { useNavigate } from 'react-router-dom';
import { selectPage } from '../../redux-actions/pages';

  
function CreatePost() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.userReducer)
    const post = useSelector(state => state.postReducer)
    const [caption, setCaption] = useState("");
    const [isEmojiChosen, setIsEmojiChosen] = useState(false);
    const [file, setFile] = useState(null);
    const [inputContainsFile, setInputContainsFile] = useState(false);
    const [currentlyUploading, setCurrentlyUploading] = useState(false);
    const [imageId, setImageId] = useState(null);
    const [progress, setProgress] = useState(null);
    const [data, setData] = useState({postedBy: user.user.username, media: imageId, caption : caption });
    const token = useSelector(state => state.userReducer).token;
    const handleFile = (event) => {
      setFile(event.target.files[0]);
      setInputContainsFile(true);
    };
  
    const fileUploadHandler = () => {
      const fd = new FormData();
      fd.append('image', file, file.name);
      axios.post(`/api/image/uploadImage/`, fd, {
            onUploadProgress: (progressEvent) => {
            setProgress((progressEvent.loaded / progressEvent.total) * 100);
            console.log(
              'upload progress: ',
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
          },
          headers: {
            "Access-Control-Allow-Origin" :  "*",
            'content-type': 'application/json',
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods" : "GET,HEAD,OPTIONS,POST,PUT" ,
            "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
            'auth-token' :  token
        }
        })
        .then(({ data }) => {
          setImageId(data);
          setFile(null);
          setInputContainsFile(false);
          setCurrentlyUploading(false);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 400) {
            const errMsg = err.response.data;
            if (errMsg) {
              console.log(errMsg);
              alert(errMsg);
            }
          } else if (err.response.status === 500) {
            console.log('db error');
            alert('db error');
          } else {
            console.log('other error: ', err);
          }
          setInputContainsFile(false);
          setCurrentlyUploading(false);
        });
    };
  
    const handleClick = () => {
      if (inputContainsFile) {
        setCurrentlyUploading(true);
        fileUploadHandler();
      }
    };
    useEffect(() => {
        if(imageId){
            setData({
                postedBy: user.user.username,
                media: imageId, 
                caption : caption
            })
        }
        
    }, [imageId,caption])
    const onEmojiclickk = (event, emojiObject) =>{
      setCaption( prevText => prevText + emojiObject.emoji)
    }
    const changeImage = () =>{
      setImageId(null)
      setInputContainsFile(false)
      setFile(null)
    }
    const deleteImage = ()=>{
      axios({
        method: "post",
        url:`http://localhost:5000/api/image/deleteImage/` ,
        headers: {
            "Access-Control-Allow-Origin" :  "*",
            'content-type': 'application/json',
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods" : "GET,HEAD,OPTIONS,POST,PUT" ,
            "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
            'auth-token' :  token
        },
        data: {id : imageId}
    })
    .then(({ data }) => {
      
      setImageId(null);
      setFile(null);
      setInputContainsFile(false);
      setCurrentlyUploading(false);
    })
    .catch((err) => {
      console.log(err);
      if (err.response.status === 400) {
        const errMsg = err.response.data;
        if (errMsg) {
          console.log(errMsg);
          alert(errMsg);
        }
      } else if (err.response.status === 500) {
        console.log('db error');
        alert('db error');
      } else {
        console.log('other error: ', err);
      }
      setInputContainsFile(false);
      setCurrentlyUploading(false);
    });
    }
    function navigateHome () {
      if(post.status === "success") { 
        navigate("/")
        dispatch(selectPage('home'))
      };
    }
    
    return (
        <div className='create-post'>
            <div className="picture">
                  <div className={`regular`} style={{position : ` ${imageId ? "static" : "relative"}` , border :  `${imageId ? "none" : " 2px dashed #a7a7a7"}`}}>
              <div className={` ${imageId ? "image-success" : "image-section"}`}>
                {imageId ? (
                  <>
                    <img
                      className='image'
                      src={`http://localhost:5000/api/image/${imageId}`}
                      alt='regular version'
                    />
                    <div className='image-modif'>
                      <Button variant="outline-primary" onClick={changeImage} >
                      <svg className='edit-svg' height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.202 3.203H5.25a3 3 0 00-3 3V18.75a3 3 0 003 3h12.547a3 3 0 003-3v-6.952" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 012.004 0l1.224 1.225a1.417 1.417 0 010 2.004z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" x1="16.848" x2="20.076" y1="3.924" y2="7.153"></line></svg>
                        Change
                        </Button>
                      <Button variant="danger" onClick={deleteImage} >
                      <svg className='delet-svg' xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 48 48" width="24px" height="24px"><path d="M 20.5 4 A 1.50015 1.50015 0 0 0 19.066406 6 L 14.640625 6 C 12.803372 6 11.082924 6.9194511 10.064453 8.4492188 L 7.6972656 12 L 7.5 12 A 1.50015 1.50015 0 1 0 7.5 15 L 8.2636719 15 A 1.50015 1.50015 0 0 0 8.6523438 15.007812 L 11.125 38.085938 C 11.423352 40.868277 13.795836 43 16.59375 43 L 31.404297 43 C 34.202211 43 36.574695 40.868277 36.873047 38.085938 L 39.347656 15.007812 A 1.50015 1.50015 0 0 0 39.728516 15 L 40.5 15 A 1.50015 1.50015 0 1 0 40.5 12 L 40.302734 12 L 37.935547 8.4492188 C 36.916254 6.9202798 35.196001 6 33.359375 6 L 28.933594 6 A 1.50015 1.50015 0 0 0 27.5 4 L 20.5 4 z M 14.640625 9 L 33.359375 9 C 34.196749 9 34.974746 9.4162203 35.439453 10.113281 L 36.697266 12 L 11.302734 12 L 12.560547 10.113281 A 1.50015 1.50015 0 0 0 12.5625 10.111328 C 13.025982 9.4151428 13.801878 9 14.640625 9 z M 11.669922 15 L 36.330078 15 L 33.890625 37.765625 C 33.752977 39.049286 32.694383 40 31.404297 40 L 16.59375 40 C 15.303664 40 14.247023 39.049286 14.109375 37.765625 L 11.669922 15 z"/></svg>
                        Delete
                      </Button>
                    </div>
                  </>
                ) : (
                  <svg  color="#262626" fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>

                )}
              </div>
              <div className='inputcontainer'>
                {currentlyUploading ? (
                  <>
                  <img
                    src={LoadingDots}
                    className='loadingdots'
                    alt='upload in progress'
                  />
                      
                  </>
                ) : (
                  <>
                    <input
                      className='file-input'
                      onChange={handleFile}
                      type= "file"
                      name='image'
                      id='file'
                      accept=".jpeg, .jpg ,.png,.gif"
                    />
                    <label
                      className={`inputlabel ${file && 'file-selected'} `}
                      htmlFor='file'
                      onClick={handleClick}
                    >
                      {/* <label htmlFor='file' className='btn btn-outline-primary'>Upload Image</label> */}
                      {file ?
                       <label htmlFor='file' className='btn btn-submit-img btn-outline-success'>SUBMIT</label>
                      : <label htmlFor='file' className='btn btn-outline-primary'>Upload Image</label>}
                    </label>
                  </>
                )}
                
              </div>
        
      </div>
            </div>
            <div className="post-info">
                <div className="top">
                    <Person/>
                </div>
                <div className="middle">
                    <textarea  id="caption" placeholder="Write a caption..." className='caption' autocomplete="off" 
                    autocorrect="off" style={{height: "24px !important" }} value={caption} onChange={(e)=> setCaption(e.target.value)}
                    maxLength="2200"  />
                    <label htmlFor="caption">
                        <div  ><svg onClick={()=> setIsEmojiChosen( val => !val) } style={{cursor : "pointer"  }} color="#8e8e8e" fill="#8e8e8e" height="20" role="img" viewBox="0 0 24 24" width="20"><path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path></svg></div>

                        {caption.length}/2,200
                        {isEmojiChosen && (
                          <Picker 
                          pickerStyle={{ width: "100%",zIndex : "22" ,position : "absolute", right:"0" , top:"32px" ,border:"2px solid #444" }}
                          onEmojiClick={onEmojiclickk} 
                          native={true}/>
                         )}
                    </label>
                </div>
                <div className="third">
                    <Button onClick={()=>{ 
                        dispatch(addPost(token, data));
                        navigateHome()
                        
                    }} className='addPost' variant="primary" >Add Post </Button>
                </div>
            </div>
        </div>
    )
}
function Person ({img=profil,name="Aymen Sedky",userName="Aymen_Sedky"}){
    return(<>
        <a href={`/${userName}`} style={{textDecoration : "none"}}>
           <div className="person">
                <img src={img} alt="person" />
                <div className="text">
                    <p className='Title'>{name}</p>
                    
                </div>
           </div>
           </a>
    </>)
}


export default CreatePost
/* 
import { FileUploader } from "react-drag-drop-files";

import { makeStyles  } from '@material-ui/core';

import { DropzoneDialog } from 'material-ui-dropzone';

const fileTypes = ["JPEG", "PNG", "GIF"];

const useStyles = makeStyles({
  muiVersion: {
    background: 'linear-gradient(to bottom right, #ccc, #eee)',
    marginTop: '4em',
    textAlign: 'center',
    padding: '1em',
    borderRadius: '4px',
  },
  btn: {
    background: '#333',
    color: 'white',
    fontSize: '2.4rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    padding: '1em 2.4em',
    boxShadow: '0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 0.466)',
    '&:hover': {
      background: '#111',
      transform: 'translateY(-0.25rem)',
      boxShadow: '0.45rem 0.45rem 0.45rem rgba(153, 153, 153, 0.651)',
    },
  },
  imageSection: {
    height: '20em',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
  },
  img: {
    width: '25vw',
    height: '25vw',
    minWidth: '10em',
    minHeight: '10em',
    maxWidth: '20em',
    maxHeight: '20em',
    objectFit: 'contain',
  },
  nopic: { color: 'black' },
  link: { color: 'black' },
});
const MuiVersion = () => {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [currentlyUploading, setCurrentlyUploading] = useState(false);

  const handleFile = ([file]) => file && setImageFile(file);
  const handleDelete = () => setImageFile(null);
  const handleSubmit = ([file]) => {
    const fd = new FormData();
    fd.append('image', file, file.name);
    axios
      .post('/api/image/upload', fd, {
        onUploadProgress: (progressEvent) => {
          setProgress((progressEvent.loaded / progressEvent.total) * 100);
          console.log(
            'upload progress: ',
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          );
        },
      })
      .then(({ data }) => {
        setImageId(data);
        setImageFile(null);
        setCurrentlyUploading(false);
        setShow(false);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          const errMsg = err.response.data;
          if (errMsg) {
            console.log(errMsg);
            alert(errMsg);
          }
        } else if (err.response.status === 500) {
          console.log('db error');
          alert('db error');
        } else {
          console.log('other error');
        }
        setCurrentlyUploading(false);
        setShow(false);
      });
  };
  return (
    <div className={classes.muiVersion}>
      <div className={classes.imageSection}>
        {imageId ? (
          <>
            <img
              className={classes.img}
              src={`/api/image/${imageId}`}
              alt='material ui version preview'
            />
            <a
              className={classes.link}
              href={`/api/image/${imageId}`}
              target='_blank'
            >
              link
            </a>
          </>
        ) : (
          <p className={classes.nopic}>no mui version pic yet</p>
        )}
      </div>
      <Button className={classes.btn} onClick={() => setShow(true)}>
        mui version
      </Button>
      <DropzoneDialog
        open={show}
        onChange={handleFile}
        onClose={() => setShow(false)}
        onDelete={handleDelete}
        acceptedFiles={['image/jpeg', 'image/png']}
        maxFileSize={5000000}
        filesLimit={1}
        showFileNamesInPreview={false}
        showFileNames={false}
        dropzoneText={'Drop it here'}
        getFileAddedMessage={() => 'file added!'}
        getFileRemovedMessage={() => 'file removed!'}
        onAlert={(alert) => console.log({ alert })}
        getFileLimitExceedMessage={() => 'file is too big'}
        getDropRejectMessage={(file) => {
          if (file.size > 5000000) return 'file is too big';
          else return 'invalid file type';
        }}
        onSave={handleSubmit}
      />
    </div>
  );
};
function VersionOne(){
    const [file, setFile] = useState(null);

    const handleChange = (file) => {
        setFile(file);
    };
    return(
        <>
        <FileUploader handleChange={handleChange} classes="drop-zone" name="file" types={fileTypes} 
                children={<div className='container'>
                            <svg  color="#262626" fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                            <Button className='uploader' variant="outline-dark">Select images from your desktop</Button>
                            </div>} 
            hoverTitle={"Drop here"} label={" Upload  or drop a file right here"}  />
                <p className={file? `success` : ""} >{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
        </>
    )
}

const Regular = () => {
    const [file, setFile] = useState(null);
    const [inputContainsFile, setInputContainsFile] = useState(false);
    const [currentlyUploading, setCurrentlyUploading] = useState(false);
    const [imageId, setImageId] = useState(null);
    const [progress, setProgress] = useState(null);
    const token = useSelector(state => state.userReducer).token;
    const handleFile = (event) => {
      setFile(event.target.files[0]);
      setInputContainsFile(true);
    };
  
    const fileUploadHandler = () => {
      const fd = new FormData();
      fd.append('image', file, file.name);
      axios.post(`/api/posts/upload/`, fd, {
            onUploadProgress: (progressEvent) => {
            setProgress((progressEvent.loaded / progressEvent.total) * 100);
            console.log(
              'upload progress: ',
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
          },
          headers: {
            "Access-Control-Allow-Origin" :  "*",
            'content-type': 'application/json',
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods" : "GET,HEAD,OPTIONS,POST,PUT" ,
            "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
            'auth-token' :  token
        }
        })
        .then(({ data }) => {
          setImageId(data);
          setFile(null);
          setInputContainsFile(false);
          setCurrentlyUploading(false);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 400) {
            const errMsg = err.response.data;
            if (errMsg) {
              console.log(errMsg);
              alert(errMsg);
            }
          } else if (err.response.status === 500) {
            console.log('db error');
            alert('db error');
          } else {
            console.log('other error: ', err);
          }
          setInputContainsFile(false);
          setCurrentlyUploading(false);
        });
    };
  
    const handleClick = () => {
      if (inputContainsFile) {
        setCurrentlyUploading(true);
        fileUploadHandler();
      }
    };
    return (
      <div className={`regular`} style={{position : ` ${imageId ? "static" : "relative"}` , border :  `${imageId ? "none" : "border: 2px dashed #a7a7a7"}`}}>
        <div className={` ${imageId ? "image-success" : "image-section"}`}>
          {imageId ? (
            <>
              <img
                className='image'
                src={`http://localhost:5000/api/posts/${imageId}`}
                alt='regular version'
              />
              <div className='image-modif'>
                 <Button variant="outline-primary">
                 <svg className='edit-svg' height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.202 3.203H5.25a3 3 0 00-3 3V18.75a3 3 0 003 3h12.547a3 3 0 003-3v-6.952" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 012.004 0l1.224 1.225a1.417 1.417 0 010 2.004z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" x1="16.848" x2="20.076" y1="3.924" y2="7.153"></line></svg>
                   Change
                  </Button>
                 <Button variant="danger">
                 <svg className='delet-svg' xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 48 48" width="24px" height="24px"><path d="M 20.5 4 A 1.50015 1.50015 0 0 0 19.066406 6 L 14.640625 6 C 12.803372 6 11.082924 6.9194511 10.064453 8.4492188 L 7.6972656 12 L 7.5 12 A 1.50015 1.50015 0 1 0 7.5 15 L 8.2636719 15 A 1.50015 1.50015 0 0 0 8.6523438 15.007812 L 11.125 38.085938 C 11.423352 40.868277 13.795836 43 16.59375 43 L 31.404297 43 C 34.202211 43 36.574695 40.868277 36.873047 38.085938 L 39.347656 15.007812 A 1.50015 1.50015 0 0 0 39.728516 15 L 40.5 15 A 1.50015 1.50015 0 1 0 40.5 12 L 40.302734 12 L 37.935547 8.4492188 C 36.916254 6.9202798 35.196001 6 33.359375 6 L 28.933594 6 A 1.50015 1.50015 0 0 0 27.5 4 L 20.5 4 z M 14.640625 9 L 33.359375 9 C 34.196749 9 34.974746 9.4162203 35.439453 10.113281 L 36.697266 12 L 11.302734 12 L 12.560547 10.113281 A 1.50015 1.50015 0 0 0 12.5625 10.111328 C 13.025982 9.4151428 13.801878 9 14.640625 9 z M 11.669922 15 L 36.330078 15 L 33.890625 37.765625 C 33.752977 39.049286 32.694383 40 31.404297 40 L 16.59375 40 C 15.303664 40 14.247023 39.049286 14.109375 37.765625 L 11.669922 15 z"/></svg>
                   Delete
                 </Button>
              </div>
            </>
          ) : (
            <svg  color="#262626" fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>

          )}
        </div>
        <div className='inputcontainer'>
          {currentlyUploading ? (
            <>
            <img
              src={LoadingDots}
              className='loadingdots'
              alt='upload in progress'
            />
                
            </>
          ) : (
            <>
              <input
                className='file-input'
                onChange={handleFile}
                type= "file"
                name='image'
                id='file'
                accept=".jpeg, .jpg ,.png,.gif"
              />
              <label
                className={`inputlabel ${file && 'file-selected'} `}
                htmlFor='file'
                onClick={handleClick}
              >
                {file ? <label htmlFor='file' className='btn btn-submit-img btn-outline-success    '>SUBMIT</label>
                 : <label htmlFor='file' className='btn btn-outline-primary'>Upload Image</label>}
              </label>
            </>
          )}
          
        </div>
        
      </div>
    );
  };

*/