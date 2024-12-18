import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import profil from "../../navigation/images/profile-pic.jpg";
import Spin from "react-cssfx-loading/lib/Spin";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  getPosts,
  likePost,
  resetInfo,
} from "../../../redux-actions/postsAction";
function Post({
  key = "",
  image_id = "",
  id = "",
  caption = "",
  username = "",
  likes = [],
}) {
  const [isVisible, setIsVisible] = useState(false);
  const user = useSelector((state) => state.userReducer);
  const [isFetched, setIsFetched] = useState(0);
  const [numLikes, setNumLikes] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(likes.includes(user.user.username));
  const post = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();
  const dispatchLikePost = () => {
    setIsFetched((isFetched) => isFetched + 1);
  };

  useEffect(() => {
    if (isFetched === 0) {
      console.log("loaded");
      return;
    }
    Promise.all([
      new Promise((resolve, reject) => {
        resolve(
          dispatch(
            likePost(user.token, { id: id, likedBy: user.user.username }),
          ),
        );
        console.log("updating like");
      }),
      new Promise((resolve, reject) => {
        resolve(dispatch(getPosts(user.token)));
        console.log("updating post");
      }),
    ]);
  }, [isFetched]);
  useEffect(() => {
    if (isFetched !== 0) {
      setIsLiked(!likes.includes(user.user.username));
      setNumLikes(
        !likes.includes(user.user.username)
          ? likes.length + 1
          : likes.length - 1,
      );
    }
  }, [likes]);

  const handleClick = (e) => {
    switch (e.detail) {
      case 2:
        console.log("double click");
        dispatchLikePost();
        break;

      default:
        return;
    }
  };
  // for(let i=0 ; i<likes.length ; i++){
  //     if(user.user.username === likes[i]){
  //         setIsLiked(true)
  //     }
  // }

  return (
    <div className="Post" key={key}>
      <div className="top">
        <div className="user">
          <Person />
        </div>
        <div className="options">
          <svg
            onClick={() => setIsVisible(true)}
            aria-label="More options"
            className="normal-state"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24">
            <circle cx="12" cy="12" r="1.5"></circle>
            <circle cx="6" cy="12" r="1.5"></circle>
            <circle cx="18" cy="12" r="1.5"></circle>
          </svg>
          <div
            className={`dropdown-container ${
              isVisible ? "visible" : "not-visible"
            }`}>
            <div className="dropdown">
              {username === user.user.username && (
                <>
                  <button
                    className="dropdown-item danger"
                    onClick={() => {
                      dispatch(deletePost(user.token, id));
                      dispatch(getPosts(user.token));
                      setIsVisible(false);
                      dispatch(resetInfo());
                    }}>
                    Delete
                  </button>
                </>
              )}
              {!(username === user.user.username) && (
                <button className="dropdown-item danger">Report</button>
              )}
              {!(username === user.user.username) && (
                <button className="dropdown-item danger">Unfollow</button>
              )}
              <a href={`/p/${id}`}>
                <button className="dropdown-item">Go to post</button>
              </a>
              <button className="dropdown-item">Copy Link</button>
              <button
                className="dropdown-item"
                onClick={() => setIsVisible(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="middle">
        <LazyLoadImage
          delayTime={100}
          visibleByDefault={true}
          effect="blur"
          src={`http://localhost:5000/api/image/${image_id}`}
          alt=""
          className="middle"
          onClick={handleClick}
        />
        {/* <img  src={`http://localhost:5000/api/image/${image_id}`} alt="" className="middle" />  */}
        <div className="loading">
          <Spin />
        </div>
      </div>
      <div className="bottom">
        <div className="first">
          <div className="icons">
            {/* like icon */}
            <div className="icon">
              <svg
                onClick={() => {
                  dispatchLikePost();
                }}
                aria-label="Like"
                class={`normal-state ${isLiked ? "liked" : ""} `}
                height="24"
                role="img"
                viewBox={`0 0 ${isLiked ? "48 48" : "24 24"}`}
                width="24">
                <path
                  d={`${
                    isLiked
                      ? "M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
                      : "M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"
                  }`}></path>
              </svg>
            </div>
            {/* comment icon */}
            <div className="icon">
              <svg
                aria-label="Comment"
                class="normal-state"
                color="#262626"
                fill="#262626"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24">
                <path
                  d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
                  fill="none"
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="2"></path>
              </svg>
            </div>
            {/* share icon */}
            <div className="icon">
              <svg
                aria-label="Share Post"
                class="normal-state"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24">
                <line
                  fill="none"
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="2"
                  x1="22"
                  x2="9.218"
                  y1="3"
                  y2="10.083"></line>
                <polygon
                  fill="none"
                  points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="2"></polygon>
              </svg>
            </div>
          </div>
          <div className="save">
            <div className="icon">
              <svg
                aria-label="Save"
                class="normal-state"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24">
                <polygon
                  fill="none"
                  points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"></polygon>
              </svg>
            </div>
          </div>
        </div>
        <div className="second">
          <p>{numLikes} Likes</p>
        </div>
        <div className="caption">
          <p className="username">{username}</p>
          <p>{caption}</p>
        </div>
        <div className="third">
          <p>View all 34 comments</p>
        </div>
        <div className="fourth">
          <p>5 hours ago</p>
        </div>
        <div className="comment">
          <div className="icon">
            <svg
              aria-label="Emoji"
              class="normal-state"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24">
              <path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path>
            </svg>
          </div>
          <textarea
            name="comment"
            id="comment"
            autoComplete="off"
            autoCorrect="off"
            placeholder="Add a comment..."></textarea>
          <button type="button">Post</button>
        </div>
      </div>
    </div>
  );
}
function Person({
  img = profil,
  name = "Aymen Sedky",
  userName = "Aymen_Sedky",
}) {
  return (
    <>
      <a href={`/${userName}`} style={{ textDecoration: "none" }}>
        <div className="person">
          <img src={img} alt="person" />
          <div className="text">
            <p className="Title">{name}</p>
          </div>
        </div>
      </a>
    </>
  );
}

export default Post;
