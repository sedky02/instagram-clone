import React, { useEffect, useState } from 'react';
import "./style.scss";
import img1 from "./images/img1.jpg";
import img2 from "./images/img2.jpg";
import img3 from "./images/img3.jpg";
import img4 from "./images/img4.jpg";
import img5 from "./images/img5.jpg";
import {useDispatch, useSelector} from "react-redux";
import { registerUser } from '../../redux-actions/index';
import Register from './register';
import Login from './login';
function LOGIN_PAGE() {
    const isRegistred = useSelector(state => state.userReducer).isRegistred
    return (
        <main className='Login_page'>
           <section>
               <div className="images">
                   
                   <div className="inner-img">
                        <img src={img5} alt="" />
                        <img src={img4} alt="" />
                        <img src={img3} alt="" />
                        <img src={img2} alt="" />
                        <img src={img1} alt="" />
                   </div>
               </div>
               {isRegistred?  <Login /> : <Register/>}
           </section>
        </main>
    )
}

export default LOGIN_PAGE;
