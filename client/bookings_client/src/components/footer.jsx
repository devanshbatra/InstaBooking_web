import React from 'react'
import styled from 'styled-components';
import { footerData } from '../mocks/homeMock';

const Footer = () => {
  return (
    <FooterCont>
        <div className='listCont'>
            {footerData.map(footItem=>(
                <ul className="footerItem" key={footItem[0]}>
                    {footItem.map(listItem=>(
                        <li className='listItem' >{listItem}</li>
                    ))}
                </ul>
            ))}
        </div>
        <p className="copyright">&copy; instabooking 2023.</p>
    </FooterCont>
  )
}

const FooterCont = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    color: ${props=>props.theme.colors.primaryBtn};
    padding: 4rem 0rem;

    .listCont{
        display: flex;
        width: 100%;
        justify-content: space-around;
    }

    .footerItem{
        display: flex;
        flex-direction: column;
    }

    .listItem{
        list-style: none;
        cursor: pointer;
    }
    .listItem:hover{
        text-decoration: underline;
    }

    .copyright{
        margin-top: 1rem;
    }

`

export default Footer;