import React, { useState, useContext, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import axios from "axios";

function Comment({ currPost, currPostAccount}) {
  const currLogin = localStorage.getItem("login");
  const [currLoginState, setCurrLoginState] = useState();
  const [postProfile, setPostProfile] = useState(currPostAccount);


  // For input Comment
  const [inputComment, setInputComment] = useState('');

  function handleComment(e){
    setInputComment(e.target.value);
  }
  console.log(postProfile);

  // Getting Current Login information
  useEffect(()=>{
    axios.get('http://localhost:3002/posts')
    .then((res)=>{
      const data = res.data;
      const result = data.find((account)=> account.email === currLogin);
      setCurrLoginState(result);
    })
    .catch((err)=> console.log("Error occure while fetching data: ", err));
  },[])

  function updateComment(){

    // Creating Object for new Comment
    const newComment = {
      id: currPost?.comment.length + 1,
      account_username: currLoginState?.username,
      account_profile: currLoginState?.profile,
      comment_msg: inputComment
    }

    // Adding Comment into Current Selected Post
    const CurrentPostInfo = postProfile?.post.map((post)=>{
      if(post?.post_id === currPost?.post_id){
        post?.comment.push(newComment);
      }
      return post;
    })

    // Adding updated Comment Post into Account
   setPostProfile((prevState)=>({
    ...prevState,
    post : [...prevState.post, CurrentPostInfo]
   }));

   // Updating JSON server with New Comment
    axios.put(`http://localhost:3002/posts/${postProfile.id}`, {
      id: postProfile.id,
      email:postProfile.email,
      password: postProfile.password,
      username: postProfile.username,
      profile:postProfile.profile,
      post: postProfile.post
    })
    .then((res)=> {setPostProfile(res.data)})
    .catch((err)=> console.log("Error Occure while sending comment", err))

    setInputComment('');
  }


  return (
    <>
      <div id="container-comment">
        <div id="comment-box">
          {currPost?.comment && currPost?.comment.length !== 0 ? (
            <h3 id="heading-comment">Comments: </h3>
          ) : (
            <h3 id="heading-comment">No Comments yet</h3>
          )}

          {
            currPost?.comment && currPost?.comment.length !== 0 &&
            currPost?.comment.map((singleComment)=>{
              return <div key={singleComment.id} id="singleComment">
                <img src={singleComment?.account_profile} alt="profile" className="comment-account-profile" />
                <div id="comment-account">
                  <p id="p1">{singleComment?.account_username}</p>
                  <p id="p2">{singleComment?.comment_msg}</p>
                </div>
              </div>
            })
          }
          <div id="profile-input">
            <img src={currLoginState?.profile} alt="profile" className="comment-profile" />
            <input type="text" placeholder="Write something...." id="comment" value={inputComment} onChange={(e)=>handleComment(e)}/>
            <button id="comment-btn" onClick={updateComment}>
              <FiSend />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;
