import React from 'react';
import post_trending from "./trending.json";
import '../home.css';

function Trending() {
  return (
    <>
     <div id="last-section">
        <div id='tranding-section'>
            <h2 id='trending-heading'>What's happening</h2>
            <div id="trend">
            {
                post_trending.map((item)=>{
                    return <div key={item.id} id='single-trend'>
                        <p id='topic'>{item.topic}</p>
                        <p id='trending-title'>{item.title}</p>
                        <p id='post_count'>{item.post_count} posts</p>
                    </div>
                })
            }
            </div>
        </div>
    </div>
    </>
  )
}

export default Trending