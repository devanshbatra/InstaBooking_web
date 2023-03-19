import React from 'react';
import styled from 'styled-components';
import EmailBar from '../../components/emailBar';
import Featured from '../../components/featured';
import Footer from '../../components/footer';
import Header from '../../components/header';
import LovedProperties from '../../components/lovedProperties';
import Navbar from '../../components/navbar';
import PropertyList from '../../components/propertyList';

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <HomeContainer>
        <Featured/>
        <HomeTitle>Search by property type</HomeTitle>
        <PropertyList/>
        <HomeTitle>Homes guests love</HomeTitle>
        <LovedProperties/>
        <EmailBar/>
        <Footer/>
      </HomeContainer>
    </div>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`;

const HomeTitle = styled.h1`
  margin: 5rem 0rem 1rem 0rem;
  width: 1024px;
  font-size: ${props=>props.theme.fontSizes.fs2};
  font-weight: bold;
`


export default Home;