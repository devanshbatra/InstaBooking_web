import React from 'react';
import styled from 'styled-components';
import Header from '../../components/header';
import ListResults from '../../components/listResults';
import ListSearch from '../../components/listSearch';
import Navbar from '../../components/navbar';

const List = () => {
  return (
    <>
      <Navbar/>
      <Header type = "list" />

      <ListContainer>
        <div className="list-wrapper">
          <ListSearch/>
          <ListResults/>
        </div>
      </ListContainer>


    </>
  );
}

const ListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  .list-wrapper{
    display: flex;
    margin: 2rem 0rem;
    width: 100%;
    max-width: 1024px;
    gap: 1rem;
  }
`

export default List;