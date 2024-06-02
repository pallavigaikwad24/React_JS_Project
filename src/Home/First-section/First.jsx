import React, { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ContextComponent } from '../../App.jsx';


function First() {
  const {username} = useParams();

  // const {setDisplay} = useContext(ContextComponent);

  // const showPost= ()=>{
  //   setDisplay("block");
  // }

  const navigate = useNavigate();

  function logout(){
    localStorage.removeItem('login');
    localStorage.removeItem('currLogin');
    navigate('/login');
  }

  return (
    <>
    <div id="side-section">
        <ul id='list'>
            <li className='list-item' id='logo'><i className="fa-brands fa-square-pied-piper"></i>&nbsp; Circlify</li>
            <Link to={`/login/${username}/home`}><li className='list-item'><i className="fa-solid fa-house-chimney"></i>&nbsp; Home</li></Link>
            <Link to={`/login/${username}/explore`}> <li className='list-item'><i className="fa-solid fa-magnifying-glass"></i>&nbsp; Explore</li></Link>
            <Link to={`/login/${username}/profile`}><li className='list-item'><i className="fa-solid fa-user"></i>&nbsp; Profile</li></Link>
            {/* <li className='list-item' onClick={showPost}><button id='post-btn'>Post</button></li> */}
            <li className='list-item'><button onClick={logout} id='logout'>Logout</button></li>
        </ul>
      </div>
    </>
  )
}

export default First