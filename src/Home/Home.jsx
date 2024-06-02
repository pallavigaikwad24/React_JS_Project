import React, { useContext, useEffect, useState } from 'react';
import './home.css';
import axios from 'axios';
import Trending from './Last-Section/Trending.jsx';
// import Middle from './Middle-Section/Middle.jsx';
import First from './First-section/First.jsx';
import {lazy, Suspense} from 'react';

const Middle = lazy(()=> import('./Middle-Section/Middle.jsx'))

function Home() {

  const [post, setPost] = useState([]);
  const [startLoading, setStartLoading] = useState(true);
  
  useEffect(()=>{

    setTimeout(() => {
      setStartLoading(false);
    }, 1500);

    axios.get('http://localhost:3002/posts')
      .then((res)=> setPost(res.data))
      .catch((err) => console.log("Something went wrong", err))
      
  },[])

  return (
    <>
        <div className='container'>

            {/* Start Loading */}
            {
                startLoading ? 
                <div id="body">
                    <i className="fa-brands fa-square-pied-piper" id='start-loader'></i>
                    <p id='title'>Circlify</p>
                </div> : ""
            }

            {/* First Section */}
              <First/>
          
            {/* Second Section */}
            <Suspense fallback={<img src="../../../../../public/loader.svg" alt="loader" width={"100px"} height={"100px"} style={{margin:"45px auto"}} id='loader'/> }>
              <Middle post={post}/>  
            </Suspense>

            {/* Third Section */}
              <Trending/>

        </div>
    </>
  )
}

export default Home