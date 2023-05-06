import React from 'react'
import styled from 'styled-components';

const EmailBar = () => {
  return (
    <EmailBarCont>
        <h1 className="title">Save time, save money!</h1>
        <h2 className="subtitle">
            Sign up and we'll send the best deals for you
        </h2>
        <div className="email_input_cont">
            <input type="email" name="email" id="email" placeholder='Your Email' />
            <button>Subscribe</button>
        </div>
    </EmailBarCont>
  );
}

const EmailBarCont = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props=>props.theme.colors.primary};
    color: ${props=>props.theme.colors.white};
    padding: 4rem 0rem;
    width: 100%;
    margin-top: 10rem;

    .title{
        font-size: ${props=>props.theme.fontSizes.fs3};
        font-weight: bold;
    }
    .subtitle{
        font-size: ${props=>props.theme.fontSizes.fs1};
        font-weight: 500;  
    }

    .email_input_cont{
        margin-top: 2rem;

        input{
            width: 13rem;
            height: 2.5rem;
            border: none;
            margin-right: 1rem;
            padding: 4px 7px;
            outline: none;
            border-radius: 4px;
        }
        button{
            height: 2.5rem;
            border: none;
            color: ${props=>props.theme.colors.white};
            background-color: ${props=>props.theme.colors.primaryBtn};
            padding: 0.5rem;
            font-weight: bold;
            border-radius: 4px;

        }
    }

`;

export default EmailBar;