import React from 'react';
import styled from 'styled-components';
import {featuredItemList} from '../mocks/homeMock';
import theme from '../theme';
import useFetch from '../hooks/useFetch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from '../contexts/searchContext';
import hostName from '../mocks/hostName';
const Featured = () => {

    const {loading, data, error} = useFetch(`${hostName}/hotels/countByCity?cities=bangkok,newyork,sydney`);

    const [destination, setDestination] = useState("");
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    });
    const navigate = useNavigate();
    const {dispatch} = useContext(SearchContext);

    const handleClick=(name)=>{
        setDestination(name);

        dispatch({type: "NEW_SEARCH", payload: {destination, dates, options}});
        navigate('/hotels', {state: {destination: name, dates, options, propertyType: ""}});

    }
  return (
    <FeaturedCont>
        {loading? "Loading, please wait...":(
            <>
                {
                    featuredItemList.map((item, i)=>(
                        <FeaturedItem key={item.name} onClick={()=> handleClick(item.name.toLowerCase())} >
                            <img src={item.imageSrc} alt={item.name} />
                            <div className="featuredTitles">
                                <h1> {item.name} </h1>
                                <h2>{data[i]} properties</h2>
                            </div>
                        </FeaturedItem>
                    ))
                }
            </>
        )}
    </FeaturedCont>
  );
}

const FeaturedCont = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    width: 100%;
    max-width: 1024px;
`

const FeaturedItem = styled.div`

    border-radius: 10px;
    position: relative;
    background-color: red;
    overflow: hidden;
    height: 13rem;

    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .featuredTitles{
        position: absolute;
        bottom: 2px;
        left: 5px;
        color: ${props=>props.theme.colors.offWhite};
        font-size: ${props=> props.theme.fontSizes.fs0};
    }

`


export default Featured;