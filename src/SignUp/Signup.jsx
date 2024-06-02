import React, { useEffect, useState } from 'react';
import '../LoginPage/login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEyeSlash,FaEye } from "react-icons/fa";
import { toast } from 'react-toastify';
import { Toaster } from 'react-hot-toast';



function Signup() {

  const navigate = useNavigate();
  const [info, setInfo] = useState({email:'', password:'', confirmPass:''});
  const[data, setData] = useState();
  const [showPass, setShowPass] = useState("password"); 
  const [showPassConfirm, setShowPassConfirm] = useState("password"); 


  useEffect(()=>{
    axios.get('http://localhost:3002/posts')
    .then(res=> setData(res.data))
    .catch(err=> console.warn("Error while fetching data", err))
  },[])

  function inputValue(e){
    const {name, value} = e.target;
    setInfo({...info, [name]:value});
  }

  const isValidPassword = (password) => {
    const validation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return validation.test(password);
  };
  console.log(data);

  function validateInfo(){
    let flag = true;

    const result = data.find(obj => obj.email === info.email);
    
    if(!info.email){
      toast.error("Email is required");
      flag = false;
    }else if(result){
      toast.error("User already exist");
      flag = false;
    }else{
      if (!info.password) {
        toast.error("Password is required");
        flag = false;
      } else if (!isValidPassword(info.password)) {
        toast.error("password at least 8 characters, one capital, one digit and one small character");
        flag = false;
      }else{
        if (!info.confirmPass) {
          toast.error("Confirm password is required");
          flag = false;
        } else if (info.password !== info.confirmPass) {
          toast.error("Password should match");
          flag = false;
        }
      }
    }

    
    if(flag){
      postData();
      return true;
    }else{
      return false;
    }

  }

  const postData = async () =>{
    const idx = info.email.indexOf("@");
    const userName = info.email.slice(0, idx);
    console.log(userName);
    
    try{
      const newLogin = {
        id: String(data.length + 1),
        email: info.email,
        password: info.password,
        username: userName,
        profile: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        post : []
      }
      await axios.post('http://localhost:3002/posts', newLogin);
    }catch(err){
      console.warn("Error while adding data", err);
    }

  }

  function funSubmit(e){
    e.preventDefault();
    console.log(info);

    const isValid = validateInfo();
    if(isValid){
      console.log("Registration success");
      localStorage.setItem('login', info.email);
      navigate(`/login/${info.email}/home`);
    }else{
      console.log("Registration rejected");
    }
    
  }

  return (
    <>
    <div className="body">
    <Toaster
    position="top-center"
    reverseOrder={false}
    />
    <h3 className='heading'>Sign Up</h3>
      <form className="login-page" onSubmit={(e)=>funSubmit(e)}>
          <input type="email" name="email" id="email" value={info.email} placeholder='Enter your Email ID' onChange={(e)=> inputValue(e)}/>
          
          <div className='input-div'><input type={showPass} name='password' id='password' value={info.password} placeholder='Enter Password' onChange={(e)=>inputValue(e)}/> <span>{showPass!=="password" ? <FaEye onClick={()=>setShowPass('password')}/> : <FaEyeSlash onClick={()=> setShowPass('text')}/>}</span></div>
          
          <div className='input-div'><input type={showPassConfirm} name='confirmPass' id='confirmPass' value={info.confirmPass} placeholder='Confirm Password' onChange={(e)=>inputValue(e)}/> <span>{showPassConfirm!=="password" ? <FaEye onClick={()=>setShowPassConfirm('password')}/> : <FaEyeSlash onClick={()=> setShowPassConfirm('text')}/>}</span></div>
  
          <button type='submit' className='submit-btn'>Sign Up</button>

          <p>Already have an account?, <Link to={'/login'}>Login here</Link></p>
      </form>
      </div>
      {/* <p>Go to <Link to={'/'}>Home</Link></p> */}
    </>
  )
}

export default Signup;