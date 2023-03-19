import React from 'react';
import styled from 'styled-components';

const Navbar = () => {
  return (
    <NavbarOuter>
        <div className="navbarCont">
            <div className="logo">Insta Bookings</div>
            <div className="navButtonCont">
                <button className='navBtn' >Register</button>
                <button className='navBtn' >Login</button>
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