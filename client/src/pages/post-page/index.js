import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { deletePost, getPosts, likePost, resetInfo } from "../../redux-actions/postsAction";
import profil from "../navigation/images/profile-pic.jpg";
import imgprofil from "./poster11 v2.jpg";
import "./style.scss";
function PostPage () {
    const user = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const post = useSelector(state => state.postReducer);
    
    let likes  = []
    const [isFetched, setIsFetched] = useState(0);
    const [numLikes, setNumLikes] = useState(likes.length);
    const [isLiked, setIsLiked] = useState(likes.includes(user.user.username));
    const dispatchLikePost =  ()=> {
        setIsFetched(isFetched => isFetched + 1)       
    }
    const {id} = useParams();
    useEffect(()=>{
        dispatch(getPosts(user.token))
    },[])
    useEffect( ()=>{
        if (isFetched === 0) {
            console.log("loaded");
            return
        }
        Promise.all([
            new Promise( (resolve,reject) => {
                resolve(
                    dispatch(likePost(user.token, {id:id, likedBy: user.user.username})),
                    )
                    console.log("updating like")
            } ) ,
            new Promise( (resolve,reject) => {
                resolve(
                    dispatch(getPosts(user.token))         
                    )
                    console.log("updating post")
            } )
        ])
    },[isFetched])
    useEffect(()=>{
        if(isFetched !== 0 ){
            setIsLiked(!likes.includes(user.user.username))   ;
            setNumLikes(!likes.includes(user.user.username) ? likes.length + 1 : likes.length -1)    
        }
    },[likes])
  
    let userName = "Aymen_Sedky";
    let captionText = "This is my first caption post try"
    let time = "1 day ago"
    const textareaRef = useRef(null);
    const [currentValue, setCurrentValue ] = useState("");// you can manage data with it

    useEffect(() => {
        textareaRef.current.style.height = "0px";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = scrollHeight + "px";
        if(scrollHeight <= 84 ) {
            textareaRef.current.style.overflowY = "hidden"
        } else {
            textareaRef.current.style.overflowY = "scroll"
        }
    }, [currentValue]);    
    return(
        <div className="post-page-container">
            <div className="image-container">
                <img src={imgprofil} alt="" />
            </div>
            <div className="info-container" >
                <Person  user={user} />
                <div className="caption">
                    <div className="profile-stuff" >
                        <a href={`/${userName}`} style={{textDecoration : "none"}}>
                            <img src={profil} alt="person" />
                        </a>
                        <div className="text">
                                <span  className='Title'>
                                        <a href={`/${userName}`} className='Title' style={{textDecoration : "none"}}>
                                            {userName}
                                        </a>
                                </span>  
                                <span className="caption-text">
                                    {captionText}
                                </span>
                            
                        </div>
                    </div>
                </div>
                <div className="comment-section">
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment commentText="blabl bla lab zdblkadj z dhoaihdza if oihad ha hoaih " />
                    <Comment commentText="blabssssssssssssssssssssssssssssssssssl bla lab zdblkadj z dhoaihdza if oihad ha hoaih " />
                    <Comment commentText="blabl bla lab zdblkadj z dhoaihdza if oihad ha hoaih " />
                </div>
                <div className="bottom">
                <div className="first">
                    <div className="icons">
                        {/* like icon */}
                        <div className="icon">
                        <svg 
                        onClick={()=>{
                           dispatchLikePost();
                        }} 
                        aria-label="Like" class={`normal-state ${isLiked? "liked" : ""} `} height="24" role="img" viewBox={`0 0 ${isLiked? "48 48" : "24 24"}`} width="24">
                            <path d={`${isLiked? 
                                "M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
                                :
                                "M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"
                            }`} ></path>
                        </svg>
                        </div>
                        {/* comment icon */}
                        <div className="icon">
                        <svg aria-label="Comment" class="normal-state" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                            <path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                        </svg>
                        </div>
                        {/* share icon */}
                        <div className="icon">
                        <svg aria-label="Share Post" class="normal-state" height="24" role="img" viewBox="0 0 24 24" width="24">
                            <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon>
                        </svg>
                        </div>
                    </div>
                    <div className="save">
                        <div className="icon">
                        <svg aria-label="Save" class="normal-state" height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                        </div>
                    </div>
                </div>
                <div className="second">
                    <p>{numLikes} Likes</p>
                </div>
                <div className="third">
                    <p>{time.toUpperCase()}</p>
                </div>
                <div className="comment">
                    <div className="icon">
                    <svg aria-label="Emoji" class="normal-state" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path></svg>
                    </div>
                    <textarea 
                        ref={textareaRef}
                        value={currentValue}
                        onChange={e=>{
                            setCurrentValue(e.target.value);
                        }}
                    name="comment" id="comment" height row={4}  autoComplete='off' autoCorrect='off' placeholder='Add a comment...'  ></textarea>
                    <button type='button'>Post</button>
                </div>
                </div>
            </div>
        </div>
    )
}
function Comment ( {userName="Aymen_Sedky", commentText="my comment " , img= profil}) {
    let isLiked = false ;
    return(
        <div className="comment-container">
          <div className="first">
            <div className="profile-stuff" >
                    <a href={`/${userName}`} style={{textDecoration : "none"}}>
                        <img src={img} alt="person" />
                    </a>
                    <div className="text">
                            <span  className='Title'>
                                    <a href={`/${userName}`} className='Title' style={{textDecoration : "none"}}>
                                        {userName}
                                    </a>
                            </span>  
                            <span className="caption-text">
                                {commentText}
                            </span>
                        
                    </div>
            </div>
                <div className="comment-info">
                    <span>1h </span>
                    <span> 1 Like </span>
                    <span>Reply </span>
                </div>
          </div>
          <div className="second">
          <div className="icon">
                        <svg 
                       
                        aria-label="Like" class={`normal-state ${isLiked? "liked" : ""} `} height="24" role="img" viewBox={`0 0 ${isLiked? "48 48" : "24 24"}`} width="24">
                            <path d={`${isLiked? 
                                "M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
                                :
                                "M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"
                            }`} ></path>
                        </svg>
                        </div>
          </div>
        </div>
    )
}
function Person ({img=profil,name="Aymen Sedky",userName="Aymen_Sedky",  user }){
    const [isVisible , setIsVisible] = useState(false);
    const dispatch = useDispatch();
    const {id} = useParams();
    return(<>
           <div className="person">
                <div>
                    <a href={`/${userName}`} style={{textDecoration : "none"}}>
                        <img src={img} alt="person" />
                    </a>
                    <div className="text">
                        <a href={`/${userName}`} style={{textDecoration : "none"}}>
                            <p className='Title'>{userName}</p>
                        </a>
                    </div>
                </div>
                <svg onClick={()=> setIsVisible(true)} aria-label="More options" className='normal-state'  height="24" role="img" viewBox="0 0 24 24" width="24">
                        <circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle>
                </svg>
                <div className={`dropdown-container ${isVisible? "visible" : "not-visible"}`}  >
                    
                        <div className="dropdown">
                            {userName === user.user.username && <> 
                                <button className="dropdown-item danger" onClick={()=> {
                                        dispatch(deletePost(user.token,id))
                                        dispatch(getPosts(user.token))
                                        setIsVisible(false)
                                        dispatch(resetInfo())
                                } } >Delete</button>
                             </>  }
                            { !(userName === user.user.username) &&<button className="dropdown-item danger">Report</button>}
                            { !(userName === user.user.username) &&<button className="dropdown-item danger">Unfollow</button>}
                            <button className="dropdown-item">Copy Link</button>
                            <button className="dropdown-item" onClick={()=> setIsVisible(false)}>Cancel</button>
                        </div>
                    </div>
           </div>
    </>)
}
export default PostPage;