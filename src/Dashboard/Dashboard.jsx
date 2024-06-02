import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import './dashboard.css';
import BookInfo from './BookInfo';
import { toast } from 'react-toastify';
import { ContextComponent } from '../../../App';

function Dashboard() {

   const {success, setSuccess} = useContext(ContextComponent);

  const {username} = useParams();

  const [name, setName] = useState(username);
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const [bookItem, setBookItem] = useState();

  useEffect(() => {
    if(success){
        toast.success("You have logged in successfully in BookHub!!");
        console.log(success);
    }

    const idx = name.indexOf('@');
    const User_Name = name.slice(0,idx);
    setName(User_Name);

    const URL = 'https://www.googleapis.com/books/v1/volumes?q=self+help&key=AIzaSyCfuYhp7DQBEVqpk3WuyrgZ-MflWBynjt4'+'&maxResults=40';
    axios.get(URL)
      .then(res=> setProduct(res.data.items))
      .catch(err => console.warn("Error while fetching Data", err));

  },[]);

  function fetchData(e){
    if(e.key === "Enter"){
      axios.get('https://www.googleapis.com/books/v1/volumes?q='+search+'&key=AIzaSyCfuYhp7DQBEVqpk3WuyrgZ-MflWBynjt4'+'&maxResults=40')
      .then(res=> setProduct(res.data.items))
      .catch(err => console.warn("Error while fetching Data", err));
    }
  }

  const navigate = useNavigate();

  function logout(){
    setSuccess(false);
    localStorage.removeItem('login');
    navigate('/login');
  }
  

  return (
    <>
      <div id='main'>
        <button id='logout-btn' onClick={logout}>Logout</button>
        <input type="search" name="search" id="search" placeholder='Search' onChange={(e)=> setSearch(e.target.value)} onKeyUp={(e)=>fetchData(e)}/>
        
        <div id="products">
          {
            product.map((item)=>{

              let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
              let author = item.volumeInfo.authors;
              console.log(author);
              if(thumbnail !== undefined && author !== undefined){
                return  <div id="item" key={item.id} onClick={()=>{setShow(true); setBookItem(item)}}>
                      <img src={thumbnail} alt="book image" />
                      <h5><u>Title</u>: {item.volumeInfo.title}</h5>
                      <h5><u>Author:</u> {author.at(0)} </h5>
                  </div>
              }
            })
          }
        </div>
      </div>
      <BookInfo show={show} bookItem = {bookItem} onClose={()=>setShow(false)}/>
    </>
  )
}

export default Dashboard;