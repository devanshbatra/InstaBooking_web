import React, { useContext } from 'react';
import styled from 'styled-components';
import {FaBed, FaPlaneDeparture, FaCarAlt, FaTaxi} from "react-icons/fa";
import HeaderSearch from './headerSearch';
import { AuthContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import homeImg from '../assets/images/home_main/homeImg.png';


const Header = ({type}) => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    
    const goToRegister = ()=>{
        navigate("/register");
    }
  return (
    <HeaderOuter>
        <div className='headerCont'>
            <div className="headerList">
                <div className="headerListItem active">
                    <FaBed color='white' />
                    <span className='itemText' >Stays</span>
                </div>
                <div className="headerListItem">
                    <FaPlaneDeparture color='white' />
                    <span className='itemText' >Flights</span>
                </div>
                <div className="headerListItem">
                    <FaCarAlt color='white' />
                    <span className='itemText' >Car Rentals</span>
                </div>
                <div className="headerListItem">
                    <FaBed color='white' />
                    <span className='itemText' >Attractions</span>
                </div>
                <div className="headerListItem">
                    <FaTaxi color='white' />
                    <span className='itemText' >Airport Taxis</span>
                </div>
            </div>

            {
                type!=="list" &&
                <>

                    <div className="headerTitle">
                        A lifetime of discounts? It's Genius.
                    </div>
                    <span className="subTitle">
                        Get rewarded for your travels - unlock instant savings of 10% or more with a free InstaBooking account.
                    </span>
                    <div>
                        {user? "": (
                            <button onClick={goToRegister} className='headerBtn'>Sign in / Register</button>
                        )}
                    </div>
                    <HeaderSearch/>
                </>
            }
        </div>
    </HeaderOuter>
  );
}


const HeaderOuter = styled.div`
    /* background-color: ${props=> props.theme.colors.primary}; */
    background: url(${homeImg}) center center/cover;
    color: ${props=> props.theme.colors.white};
    padding: 10px 0px 45px 0px;
    position: relative;

    &::after{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.26);
        z-index: -1;
    }
    .headerCont{
        width: 100%;
        max-width: 1024px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: auto;
    }
    

    .headerList{
        display: flex;
        align-items: center;
        gap: 35px;
        flex-direction: row;
        padding: 30px 0px;
        /* background-color: red; */
        width: 100%;
    }
    .headerListItem{
        padding: 5px 7px;
        cursor: pointer;
        display: flex;
        align-items: center;
    }
    .itemText{
        font-weight: 500;
        padding: 0px 8px;
    }
    .headerListItem.active{
        border: 2px solid ${props=>props.theme.colors.white};
        border-radius: 16px;
    }

    .headerTitle{
        font-weight: bold;
        font-size: ${props=>props.theme.fontSizes.fs4};
    }
    .subTitle{
        padding: 10px 0px;
    }
    .headerBtn{
        cursor: pointer;
        display: inline-block;
        padding: 5px 10px;
        color: ${props=>props.theme.colors.white};
        background-color: ${props=>props.theme.colors.primaryBtn};
        border: none;
        cursor: pointer;
    }

`;

export default Header;