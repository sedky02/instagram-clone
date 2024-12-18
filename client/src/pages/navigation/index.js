import React from 'react';
import logo from "./images/insta-logo.png";
import Search from "./search"
import Items from "./nav-item"
import "./style.scss";
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <div className='nav'>
        <div className='navigation'>
            <div className="inner-nav">
                <div className="img">
                    <Link to="/" >
                    <img src={logo} alt="instagram logo" />
                    </Link>
                </div>
                <div className='search-container'>
                    <Search />
                </div>
               <div className="item-container">
                    <Items />    
               </div>
            </div>
        </div>
        </div>
    )
}

export default Navigation
