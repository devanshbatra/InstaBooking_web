import {useState} from 'react';
import styled from 'styled-components';
import Header from '../components/header';
import ListResults from '../components/listResults';
import ListSearch from '../components/listSearch';
import Navbar from '../components/navbar';
import { useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useContext } from 'react';
import { SearchContext } from '../contexts/searchContext';
import hostName from '../mocks/hostName';

const List = () => {

  //usestate hooks of ListSearch - uplifited for sharing data between both children.
  const location = useLocation();

  const [destination, setDestination] = useState(location.state? location.state.destination : "");
  const [propertyType, setPropertyType] = useState(location.state? location.state.propertyType : "");
  
  
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
    
    
    const {data, error, loading, reFetch} = useFetch(`${hostName}/hotels?${propertyType.length>0?"type":"city"}=${propertyType.length>0?propertyType: destination}&min=${min || 0}&max=${max || 99999}`);
    
    
    const {dispatch} = useContext(SearchContext);
    
    const handleSearch = (e) =>{
      e.preventDefault();
      reFetch();
      dispatch({type: "NEW_SEARCH", payload: {destination, dates, options}});
    }
    
    
    return (
    <>
      <Navbar/>
      <Header type = "list" />

      <ListContainer>
        {loading? "Loading, Please Wait...": (
          <div className="list-wrapper">
            <ListSearch destination={destination} options={options} dates={dates} setDates={setDates} setDestination={setDestination} setMin={setMin} setMax = {setMax} handleSearch = {handleSearch} />
            <ListResults data = {data} />
          </div>
        )}
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