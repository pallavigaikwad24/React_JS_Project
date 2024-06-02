import React, { useContext, useEffect, useRef, useState } from 'react';
import First from '../First.jsx';
import Trending from '../../Last-Section/Trending.jsx';
import axios from 'axios';
import ProfilePosts from './ProfilePosts.jsx';
import '../../home.css';
import PostData from './PostData.jsx';
import { ContextComponent } from '../../../App.jsx';
import { useParams } from 'react-router-dom';
import Comment from './Comment.jsx';

function Profile() {
    const {comment, setComment,display, setDisplay} = useContext(ContextComponent);

    const profile_edit = useRef(null);
    const [profilePost, setProfilePost] = useState();
    const [profileImg, setProfileImg] = useState();


    const {username} = useParams();

    useEffect(()=>{
        axios.get('http://localhost:3002/posts')
        .then((res)=> {
            const postData = res.data;
            const filtered  = postData.find((post)=> post.email === username);
            setProfilePost(filtered);
        })
        .catch((err)=> console.log("Error is occore while fetching data", err))
        
    },[])
    console.log(profilePost);
    // Edit Profile Picture

    function updateProfile(e){
        const file = e.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onload=()=>{
                setProfileImg(reader.result);
            }

            reader.readAsDataURL(file);
        }
    }

    console.log("profile Image",profileImg);

    useEffect(()=>{
        if(profileImg !== undefined)
            setProfileImage();
    },[profileImg])
    

    function setProfileImage(){
        axios.put(`http://localhost:3002/posts/${profilePost.id}`, {
            id : profilePost.id,
            email:profilePost.email,
            password:profilePost.password,
            username: profilePost.username,
            profile: profileImg,
            post: profilePost.post
        })
        .then((res)=>{setProfilePost(res.data)})
        .catch((err)=> console.warn("Error while updating profile", err))
    }

    function changeProfile(){
        profile_edit.current.click();
    }

    // Delete Button for post
    function deletePost(post_id){

        const exceptDeletePost = profilePost?.post.filter((ele) => ele?.post_id !== post_id);

        if(exceptDeletePost !== ""){
            setProfilePost(prev => ({
                ...prev,
                post : exceptDeletePost
             }));
        }

        deletePostAxios(exceptDeletePost);
    }

    function deletePostAxios(exceptDeletePost){
        
        axios.put(`http://localhost:3002/posts/${profilePost.id}`, {
            id: profilePost.id,
            email:profilePost.email,
            password: profilePost.password,
            username: profilePost.username,
            profile: profilePost.profile,
            post : exceptDeletePost
        })
        .then((res)=>{console.log(res.data)})
        .catch((err)=> console.warn("Error occure while deleting Post", err)) 
    }

    const showPost= ()=>{
        setDisplay("block");
    } 

  return (
    <>
    <div className='container'>
        <First/>
        
        <div className="middle-section">
                <div id="profile-section">
                    <div id="profile-account">
                        <img src={profilePost?.profile} alt="profile_img" id='profile_picture'/>
                        <input type="file" name="profile-edit" id="profile-edit" ref={profile_edit} accept='image/*' style={{display:"none"}} onChange={(e) => updateProfile(e)}/>
                        <p  id='edit' onClick={changeProfile}>Edit Profile <i className="fa-solid fa-pen"></i></p>
                    </div>
                    {/* Post Button */}
                    <div onClick={showPost}><button id='post-btn'><i class="fa-solid fa-user-plus"></i> &nbsp; Add Post</button></div>

                    <span id='profile-span'>Your Posts</span>
                </div>

                <div className='profile-main'>
                    {
                        profilePost?.post && profilePost?.post?.length === 0 ? <h3 className='empty-post'>No Post Uploaded</h3> :
                        profilePost?.post?.map((item)=>{
                            return <div key={item.post_id}>
                                        <ProfilePosts username = {profilePost?.username} profile={profilePost?.profile} post_description={item?.post_description} post_image={item?.post_image} deletePost={deletePost} id={item.post_id} comment={comment} setComment={setComment}/>
                                        {
                                            comment === item?.post_id && <Comment currPost={item} currPostAccount={profilePost}/>
                                        }
                                    </div>
                            })
                    }
                </div>
             
            </div>        
        <Trending/>

        {/* post Button */}
        <div id='post-body' style={{display: display}}>
        <PostData profilePost={profilePost} setProfilePost={setProfilePost} setDisplay={setDisplay}/>
        </div>
    </div>
    </>
  )
}

export default Profile;