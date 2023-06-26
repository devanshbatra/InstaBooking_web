import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const {user, dispatch} = useContext(AuthContext);
    const navigate = useNavigate();
    const logoutHandler = ()=>{
        localStorage.removeItem("user");
        dispatch({type: "LOGOUT"});
    }
    return (
        <NavbarOuter>
            <div className="navbarCont">
                <div className="logo" onClick={()=>navigate("/")} >Insta Bookings</div>
                <div className="navButtonCont">
                    {
                        user? (
                            <div className="user-cont">
                                <span>Hello, <strong>{user.username}</strong></span>
                                <div className="navBarButton" onClick={logoutHandler} >Logout</div>
                            </div>
                        ): (
                            <div className='user-cont' >
                                <div className="navBarButton" onClick={()=>navigate("/login")} >Login</div>
                                <div className="navBarButton" onClick={()=>navigate("/register")} >Register</div>
                            </div>
                        )
                    }
                </div>
            </div>
        </NavbarOuter>
    );
}



const NavbarOuter = styled.div`
    height: 50px;
    /* background-color: #00373d; */
    background-image: linear-gradient(to right,#00373d,#092c2b,#111511);
    display: flex;
    justify-content: center;
    align-items: center;

    .logo{
        font-weight: bold;
        cursor: pointer;
    }

    .navbarCont{
        width: 100%;
        max-width: 1024px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
    }

    
    .navBtn{
        margin: 0px 6px;
        color: ${props=> props.theme.colors.primary};
        padding: 5px 10px;
        cursor: pointer;
    }
    .user-cont{
        display: flex;
        gap: 0.8rem;
        align-items: center;
    }

    .navBarButton{
        padding: 4px 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        border: 2px solid ${props=>props.theme.colors.white};
        border-radius: 16px;
    }

`;

export default Navbar;