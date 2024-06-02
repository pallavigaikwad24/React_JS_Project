import React, { useRef, useState } from 'react';
import '../../home.css';
import axios from 'axios';

function PostData({profilePost, setProfilePost, setDisplay}) {

  const [description, setDescription] = useState('');
  const [img, setImg] = useState(null);
  const fileInputRef = useRef(null);

  function setPostImg(e){
    const file = e.target.files[0];
      if(file){
        const reader = new FileReader();
        reader.onload=()=>{
          setImg(reader.result);
      }
        reader.readAsDataURL(file);
    }
  }
  
  function submitButton(e){ 
    e.preventDefault();    
    // Adding new Post into state
    const newPostData = {
      post_id: Date.now(),
      post_description: description,
      post_image : img,
      comment: []
    };

    // Putiing updated state into server
    if(description.trim() !== '' && img !== null){
      axios.put(`http://localhost:3002/posts/${profilePost.id}`, {
        id:profilePost.id,
        email: profilePost.email,
        password: profilePost.password,
        username: profilePost.username,
        profile: profilePost.profile,
        post: [...profilePost.post, newPostData]
      })
      .then(res => {
        console.log("Post added successfully:", res.data);
        setProfilePost(res.data);
      })
      .catch(err => {
        console.warn("Error while posting:", err);
      });
    }

    setDescription('');
    setImg(null);
    fileInputRef.current.value = "";
    
  }

  function close(){
    setDisplay('none');
    setDescription('');
    setImg(null);
    fileInputRef.current.value = "";
  }

  return (
    <>
        <div id="postData">
          <form action="#" onSubmit={(e)=>submitButton(e)}>
            <label id='label_cross' onClick={()=>close()}><i class="fa-solid fa-xmark"></i></label>
          <label htmlFor="description">Write Post Description:</label>
            <textarea name="post_description" value={description} id="description" cols="50" rows="3" placeholder='Write Something' onChange={(e)=> setDescription(e.target.value) }></textarea> <br />
            <label htmlFor="Post_image">Upload Image here: </label>
            <input type="file" name="post_image" id="Post_image" onChange={(e)=> setPostImg(e)} ref={fileInputRef}/>
            <button id='postBtn' onClick={()=>{setDisplay("none")}} >Post</button>
            </form>
        </div>
    </>
  )
}

export default PostData;