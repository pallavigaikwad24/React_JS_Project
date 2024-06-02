import React, { useContext, useEffect, useState } from 'react';
import First from '../First.jsx';
import Trending from '../../Last-Section/Trending.jsx';
import '../../home.css';
import axios from 'axios';
import Card from '../../Middle-Section/Card.jsx';
import { ContextComponent } from '../../../App.jsx';
import Comment from '../Profile/Comment.jsx';

function Explore() {
    const [search, setSearch] = useState('');
    const [posts, setPosts] = useState();
    const [filter, setFilter] = useState();

    const {comment, setComment} = useContext(ContextComponent);


    useEffect(()=>{
      axios.get('http://localhost:3002/posts')
      .then((res)=> setPosts(res.data))
      .catch((err) => console.log("Something went wrong", err))
    },[])

    useEffect(()=>{
        const result = posts?.filter((item)=>{
            if(search !== ''){
                return item.username.toLowerCase().includes(search.toLowerCase());
            }else{
                return true;
            }
        })

        setFilter(result);
    }, [search, posts])

  return (
    <>
    <div className='container'>
        <First/>
        
        <div className="middle-section">
            <input type="search" name="search" id="search" placeholder='Search account name' onChange={(e)=> setSearch(e.target.value)} />
            <div  className='card-main'>
            {
            filter?.length === 0 ? <h3 className='empty-post'>Account not exist</h3> :
             filter?.map((item)=>{
                return item?.post && item?.post.length !== 0 &&
                      <div key={item?.id}>
                        {
                          item?.post?.map((postItem)=>{
                            return <div key={postItem.post_id}>
                            <Card username = {item?.username} profile={item?.profile} post_description={postItem?.post_description} post_image={postItem?.post_image} post_id={postItem?.post_id} comment={comment} setComment={setComment}/>
                            {
                              comment === postItem?.post_id && <Comment currPost={postItem} currPostAccount={item}/>
                            }
                            </div>
                          })
                        }
                      </div>
              })
            }
                          
            </div>
        </div>        
        <Trending/>
    </div>
    
    </>
  )
}

export default Explore;