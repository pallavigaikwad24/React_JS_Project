import React, { useContext } from 'react';
import '../../home.css';

function ProfilePosts(props) {
    const handleChange=(id)=>{
        props.setComment(props.comment===id ? null : id);
        console.log("Id",id);
    }
  return (
    <>
        <div id="card">

            {/* Heading of card */}
            <div id="heading">
                <img src={props?.profile} alt="profleImage" id='profile' />
                <h4 id='username'>{props?.username}</h4>
                <div id="update">
                    {/* <i className="fa-solid fa-pen"></i> */}
                    <i className="fa-solid fa-trash-can" onClick={()=>props.deletePost(props.id)}></i>
                </div>
            </div>

            {/* Content of post */}
            <div id="content">
                <h4>{props?.post_description}</h4>
                <img src={props?.post_image} alt="post" id='post'/>
                
                {/* Like feature */}
                <div id="feature">
                    <i className="fa-regular fa-comments icon" onClick={()=> handleChange(props?.id)}></i>
                    <i className="fa-solid fa-retweet icon"></i> 
                    <i className="fa-regular fa-heart icon" ></i>
                    <i className="fa-solid fa-chart-simple icon"></i>
                    <i className="fa-regular fa-bookmark icon"></i>
                    <i className="fa-solid fa-arrow-up-from-bracket icon"></i>
                </div>
            </div>
        </div>
    </>
  )
}

export default ProfilePosts;