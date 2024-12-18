import React, { useState } from 'react';
import "./style.scss";
import profil from "../images/profile-pic.jpg";
function Search() {
    const [search, setSearch] = useState("");
    const closed = {
        opacity : 0,
        pointerEvents: "none"
    }
    const opened = {
        opacity : 1,
        pointerEvents: "all"
    }
   
    return (
        <div className='Search'>
           <input type="search" autoComplete='off' value={search} onChange={(e)=>setSearch(e.target.value)} name="searcg" id="search" placeholder='Search' />
           <svg xmlns="http://www.w3.org/2000/svg" fill="#8e8e8e" viewBox="0 0 50 50" width="14px" height="14px">
               <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"/>
           </svg>
           <div className="result" style={search===""? closed : opened}>
               {search.replace(/ /g, '').length? <Person name={search} userName={search} /> : <EmptyResult />}
           </div>
        </div>
    )
}
function Person ({img=profil,name="Aymen Sedky",userName="Aymen_Sedky",follower="Yassin_Sedky +46more"}){
        return(<>
            <a href={`/${userName}`} style={{textDecoration : "none"}}>
               <div className="person">
                    <img src={img} alt="person" />
                    <div className="text">
                        <p className='Title'>{name}</p>
                        <p><span>@{userName}</span><span>Followed by {follower}</span></p>
                    </div>
               </div>
               </a>
        </>)
}
function EmptyResult(){
    return(<div className='empty-result'>
        <p className='Title'>Result :</p>
        <p>No result for your Search </p>
    </div>)
}

export default Search;
