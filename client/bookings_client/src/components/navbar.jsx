import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../contexts/authContext';

const Navbar = () => {
    const {user} = useContext(AuthContext);
    return (
        <NavbarOuter>
            <div className="navbarCont">
                <div className="logo">Insta Bookings</div>
                <div className="navButtonCont">
                    {
                        user? "Hello, "+user.username: (
                            <>
                                <button className='navBtn' >Register</button>
                                <button className='navBtn' >Login</button>
                            </>
                        )
                    }
                </div>
            </div>
        </NavbarOuter>
    );
}



const NavbarOuter = styled.div`
    height: 50px;
    background-color: ${props=> props.theme.colors.primary};
    display: flex;
    justify-content: center;
    align-items: center;

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

`;

export default Navbar;