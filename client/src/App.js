import './App.scss';
import Navigation from './pages/navigation';
import {
  BrowserRouter as Router,
  Route,
  Routes  
} from "react-router-dom";
import Home from './pages/home';
import LOGIN_PAGE from './pages/login';
import { useDispatch, useSelector} from "react-redux";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { useEffect } from 'react';
import CreatePost from './pages/createPost';
import { clearPost } from './redux-actions';
import { getPosts } from './redux-actions/postsAction';
import PostPage from './pages/post-page';

function App() {
  const userLogged = useSelector(state=>state.userReducer);
  const post = useSelector(state=>state.postReducer);
  const dispatch = useDispatch();
  const isLogged = userLogged.isLogged;
  useEffect(()=>{
      if(userLogged.message.length > 0 && userLogged.status.length > 0){
          createNotification(userLogged.message,userLogged.status)
      }
      console.log(userLogged);
  }, [userLogged])
   useEffect(()=>{
      if(post.message.length > 0 && post.status.length > 0){
          createNotification(post.message,post.status)
          setTimeout(() => {
            dispatch(clearPost())
          }, 4000);
      }
  }, [post])
  const createNotification = (message,status) => {
        
    switch (status) {
     
      case 'success':
        NotificationManager.success(message,"",3000);
        break;
      case 'warning':
        NotificationManager.warning(message, "",5000);
        break;
      case 'error':
        NotificationManager.error(message,"", 5000);
        break;
       default :
         console.log(null)
           break;
    }
  };
  return (
    <div className="App">
      {
        isLogged ?
        <Router>
          <Navigation/>
          <Routes>
            <Route  path="/" element={<Home/>} />
            <Route  path="/add" element={<CreatePost/>} />
            <Route  path="/p/:id" element={<PostPage/>} />
          </Routes>
        </Router> : 
        <LOGIN_PAGE/>
      }
      <NotificationContainer/>

    </div>
  );
}

export default App;
