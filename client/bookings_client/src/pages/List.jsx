import {useState} from 'react';
import styled from 'styled-components';
import Header from '../components/header';
import ListResults from '../components/listResults';
import ListSearch from '../components/listSearch';
import Navbar from '../components/navbar';
import { useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const List = () => {

  //usestate hooks of ListSearch - uplifited for sharing data between both children.
  const location = useLocation();

  const [destination, setDestination] = useState(location.state? location.state.destination : "Please Enter Destination");
  
  
  const [options, setOptions] = useState(location.state? location.state.options : {
      adult: 1,
      children: 0,
      room: 1
    });
    
    const [dates, setDates] = useState(location.state?location.state.dates: [{
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }]);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);
    
    const {data, error, loading, reFetch} = useFetch(`http://localhost:80/hotels?city=${destination}&min=${min || 0}&max=${max || 99999}`);
    
    console.log(data, destination);
    
  
  
    const handleSearch = (e) =>{
      e.preventDefault();
      reFetch();
    }
    
    
    return (
    <>
      <Navbar/>
      <Header type = "list" />

      <ListContainer>
        <div className="list-wrapper">
          <ListSearch destination={destination} options={options} dates={dates} setDates={setDates} setDestination={setDestination} setMin={setMin} setMax = {setMax} handleSearch = {handleSearch} />
          <ListResults data = {data} />
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