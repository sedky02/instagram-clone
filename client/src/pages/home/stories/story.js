import React from 'react';
import profil from "../../navigation/images/profile-pic.jpg";
function Story({img=profil, name="aymen sedki",key=0}) {
    return (
        <div style={{margin : "0"}} className='story' key={key}>
            <div className='img'><img src={img} alt="aymen sedky" /></div>
            <p>{name}</p>
        </div>
    );
}

export default Story;
