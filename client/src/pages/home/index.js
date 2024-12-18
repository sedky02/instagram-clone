import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../redux-actions/postsAction';
import Post from './posts';
import Stories from './stories';
import Suggestion from './suggestions';
import "./style.scss";
// import noPostsYet from './images/no posts yet1.jpeg'

function Home() {
    const token = useSelector(state => state.userReducer).token;
    const post_reducer = useSelector(state => state.postReducer);
    const [refrech, setRefrech] = useState(false);
    //random sort
        // const posts =  post_reducer.posts
        // .map(value => ({ value, sort: Math.random() }))
        // .sort((a, b) => a.sort - b.sort)
        // .map(({ value }) => value) ;
    //from last to first sort
        function reverseArr(arr) {
            let ret = new Array(0);
            for(let i = arr?.length-1; i >= 0; i--) {
                ret.push(arr[i]);
            }
            return ret;
        }
        let posts = reverseArr(post_reducer.posts)
        const dispatch = useDispatch();
    
  useEffect(()=>{
    dispatch(getPosts(token))
} , [])
    

    return (
        <div className='Home'>
            <div className="container">
                <div className="stories-container">
                    <Stories/>
                </div>
                <div className="posts">
                    {posts.map((post ) => {
                        return(<>
                        
                            <Post key={post._id} 
                            image_id={post.media} 
                            caption={post.caption}
                            username={post.postedBy}
                            id={post._id}
                            likes={post.likes} />
                            
                        </>)
                    })}
                    {posts.length === 0 && <h1>There is no posts yet...</h1> }
                </div>
            </div>
            <div className="suggestion-container">
                <Suggestion func = {()=>{setRefrech(!refrech)}}/>
            </div>
            
        </div>
    )
}

export default Home;
