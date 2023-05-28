import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import loginImg from '../assets/images/login/login_photo.png';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';
import axios from 'axios';

function Login() {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    });

    const handleChange = (e) =>{
        setCredentials((prev)=>({...prev, [e.target.id]: e.target.value})); //innovative technique.
    }

    const {error, loading, dispatch} = useContext(AuthContext);

    const handleLogin = async(e) =>{
        console.log(credentials);
        e.preventDefault();
        dispatch({type: "LOGIN_START"});
        try{
            const res = await axios.post("http://localhost:80/auth/login", credentials);
            dispatch({type: "LOGIN_SUCCESS", payload: res.data});
            console.log(res);
            navigate("/");
            
        }catch(err){
            console.log(err);
            dispatch({type: "LOGIN_FAILURE", payload: err.response.data});
        }
    }

  return (
      <LoginWrapper>
        <div className="sec-cont">
            <div className="left-panel">
                <h1 className="login-heading">Welcome Back,</h1>
                <p className="err-para">{error?.message}</p>
                <form className="login-form">
                    <input type="text" id="username" name="username" className="input-field" placeholder="Username" minLength="6" onChange = {handleChange}  />
                    <input type="password" id="password" name="password" className="input-field" placeholder="Password" onChange={handleChange} />
                    <button disabled={loading} type="submit" className="login-btn" onClick={handleLogin} >{
                        loading? "Loading..": "Sign In"
                    }</button>
                </form>
                <p className="login-para">Doesn't have an account? <span><Link to="/register">Sign-up here</Link></span></p>
            </div>

            <div className="right-panel">
                {/* <img src={loginImg} alt="" /> */}
                <h1 className='right-head white center'>New here?</h1>
                <p className="right-para white center">Sign up and discover great amount of new opportunities!</p>
                <Link to="/register"><button className='sign-btn white'>SIGN UP</button></Link>
            </div>
        </div>
    </LoginWrapper>
  );
}


const LoginWrapper = styled.div`
    background-color: #bcc4cd;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    .sec-cont{
        width: 100%;
        max-width: 1024px;
        background-color: ${props=>props.theme.colors.white};
        display: flex;
        height: 70%;
    }

    .left-panel{
        flex: 3;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 3rem;

        .login-heading{
            font-size: ${props=> props.theme.fontSizes.fs3};
        }
        .err-para{
            color: rgb(201, 52, 15);
            margin: 2rem 0rem;
        }
        .login-form{
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 80%;
        }

        .input-field{
            border: none;
            width: 70%;
            border-bottom: 3px solid gray;
            transition: 0.3s all ease;
            background-color: transparent;
            outline: none;
            padding: 5px 10px;
            margin-bottom: 1.5rem;
        }
        .input-field:-webkit-autofill{
            transition: all 5000s ease 0s;
        }

        .input-field:focus{
            border-bottom: 3px solid ${props=>props.theme.colors.primaryBtn};
            outline: none;
        }

        .login-btn{
            color: ${props=>props.theme.colors.white};
            background-color: ${props=>props.theme.colors.primaryBtn};
            padding: 8px 6px;
            font-weight: bold;
            width: 70%;
            cursor: pointer;
            border: none;
            border-radius: 4px;
            margin: 2rem 0rem 2rem 0rem;
        }
        .login-btn:active{
            background-color: ${props=>props.theme.colors.primary};
        }
        
        .login-para>span>a{
            font-weight: bold;
            color: ${props=>props.theme.colors.gray};
            cursor: pointer;
            text-decoration: none;

        }

        

    }

    .right-panel{
        flex: 2;
        position: relative;
        background: url(${loginImg}) no-repeat center center/cover;
        color: white;
        display: flex;
        flex-direction: column;
    }
    .right-panel::after{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.26);
        z-index: 0;
    }
    .side-image{
      position: absolute;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    .right-head{
      z-index: 10;
      text-align: center;
      margin: 1rem 1rem;
      font-size: ${props=> props.theme.fontSizes.fs3};
      margin-top: 2rem;
    }
    .right-para{
        z-index: 2;
        text-align: center;
        position: relative;
        margin: .2rem .2rem;
        width: 90%;
    }
    .sign-btn{
      z-index: 2;
      position: absolute;
      top: 50%;
      left: 50%;
      color: white;
      transform: translateX(-50%);
      background-color: transparent;
      border: 3px solid white;
      padding: 5px 14px;
      border-radius: 13px;
      outline: none;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .sign-btn:active{
      background-color: ${props=>props.theme.colors.primary};
    }
    .sign-btn:hover{
      background-color: ${props=>props.theme.colors.primaryBtn};
    }


`;



export default Login;