
import { useState, useContext } from 'react';
import '../home.css';
import { ContextComponent } from '../../App';

function Card(props) {    

    const [color, setColor] = useState('');
    const [heart, setHeart] = useState('regular')
    const {commentCount, setCommentCount} = useContext(ContextComponent);

    const handleChange=(id)=>{
        props.setComment(props.comment===id ? null : id);
    }

    function handleLike(){
        setColor(color === "red"? '' : 'red');
        setHeart(heart === 'solid'? 'regular' : 'solid');
    }

   
  return (
    <>
        <div id="card">

            {/* Heading of card */}
            <div id="heading">
                <img src={props?.profile} alt="profleImage" id='profile' />
                <h3 id='username'>{props?.username}</h3>
            </div>

            {/* Content of post */}
            <div id="content">
                <h4>{props?.post_description}</h4>
                <img src={props?.post_image} alt="post" id='post'/>
                
                {/* Like feature */}
                <div id="feature">
                    <i className="fa-regular fa-comments icon" onClick={()=> handleChange(props?.post_id)}></i>
                    <i className="fa-solid fa-retweet icon"></i> 
                    <i className={`fa-${heart} fa-heart icon`} onClick={()=> handleLike()} style={{color:color}}></i>
                    <i className="fa-solid fa-chart-simple icon"></i>
                    <i className="fa-regular fa-bookmark icon"></i>
                    <i className="fa-solid fa-arrow-up-from-bracket icon"></i>
                </div>
            </div>
        </div>
    </>
  )
}

export default Card;