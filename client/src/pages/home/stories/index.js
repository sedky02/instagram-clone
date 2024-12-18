import React from 'react';
import Story from './story';
import "./style.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items:6 ,
    slidesToSlide: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};
const data =[
    // {name: "aymen sedki", img:`https://picsum.photos/${Math.floor(Math.random()*9)}00/${Math.floor(Math.random()*9)}00`},
    // {name: "yassin sedki", img:`https://picsum.photos/${Math.floor(Math.random()*9)}00/${Math.floor(Math.random()*9)}00`},
    // {name: "dev ed brooooooooo", img:`https://picsum.photos/${Math.floor(Math.random()*9)}00/${Math.floor(Math.random()*9)}00`},
    // {name: "aymen sedki", img:`https://picsum.photos/${Math.floor(Math.random()*9)}00/${Math.floor(Math.random()*9)}00`},
    // {name: "aymen sedki", img:`https://picsum.photos/${Math.floor(Math.random()*9)}00/${Math.floor(Math.random()*9)}00`},
    // {name: "aymen sedki", img:`https://picsum.photos/${Math.floor(Math.random()*9)}00/${Math.floor(Math.random()*9)}00`},
    // {name: "aymen sedki", img:`https://picsum.photos/${Math.floor(Math.random()*9)}00/${Math.floor(Math.random()*9)}00`},
    // {name: "aymen sedki", img:`https://picsum.photos/${Math.floor(Math.random()*9)}00/${Math.floor(Math.random()*9)}00`},
    // {name: "aymen sedki", img:`https://picsum.photos/${Math.floor(Math.random()*9)}00/${Math.floor(Math.random()*9)}00`},
    // {name: "aymen sedki", img:`https://picsum.photos/${Math.floor(Math.random()*9)}00/${Math.floor(Math.random()*9)}00`},
    // {name: "aymen sedki", img:`https://picsum.photos/${Math.floor(Math.random()*9)}00/${Math.floor(Math.random()*9)}00`},
    // {name: "aymen sedki", img:`https://picsum.photos/${Math.floor(Math.random()*9)}00/${Math.floor(Math.random()*9)}00`},
    // {name: "aymen sedki", img:`https://picsum.photos/${Math.floor(Math.random()*9)}00/${Math.floor(Math.random()*9)}00`},
    // {name: "aymen sedki", img:`https://picsum.photos/${Math.floor(Math.random()*9)}00/${Math.floor(Math.random()*9)}00`},
    // {name: "aymen sedki", img:`https://picsum.photos/${Math.floor(Math.random()*9)}00/${Math.floor(Math.random()*9)}00`},
    // {name: "aymen sedki", img:`https://picsum.photos/${Math.floor(Math.random()*9)}00/${Math.floor(Math.random()*9)}00`}
    1,2,3,4,5,6,8,99,9
]
function Stories() {
    return (
        <div className='Stories'>
            <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-0-px"
        deviceType='desktop'
        itemClass="image-item"
        >
             {data.map((person , index)=>{
                 return(<Story  key={person} /> )
             })}       
        </Carousel>
            
        </div>
    )
}

export default Stories;
