import React, { useContext, useState } from 'react'
import styled from 'styled-components';
// import { lovedProp } from '../mocks/homeMock';
import useFetch from '../hooks/useFetch';
import hostName from '../mocks/hostName';
import miasto from '../assets/images/loved_prop/miasto.png';
import { SearchContext } from '../contexts/searchContext';
import { useNavigate } from 'react-router-dom';

const LovedProperties = () => {

    const {data, error, loading} = useFetch(`${hostName}/hotels?featured=true&limit=4`);

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

    const handleClick=(id, city)=>{
        setDestination(city);

        dispatch({type: "NEW_SEARCH", payload: {city, dates, options}});
        navigate(`/hotels/${id}`);

    }

  return (
    <LovedPropCont>
        {loading? "Loading, please wait...":(  
            <>
                {data.map((dataItem, i)=>(
                    <div className="propertyItem" key={dataItem._id} onClick = {()=>handleClick(dataItem._id, dataItem.city)} >
                        <img src={miasto} alt={dataItem.name} />
                        <div className="propDesc">
                            <span className="title">{dataItem.name}</span>
                            <span className="location">{dataItem.city}</span>
                            <span className="price">starting from {dataItem.cheapestPrice}$</span>
                            {
                                dataItem.ratings && (
                                    <div className="rating">
                                        <button className="rating_btn">{dataItem.ratings}</button>
                                        <p className="ratingReview">
                                            {dataItem.ratings<2?"Poor": dataItem.ratings<4? "Good" : "Excellent"}
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                ))}
            </>
        )}
    </LovedPropCont>
  );
}

const LovedPropCont = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 1024px;
    align-items: center;
    justify-content: space-between;

    .propertyItem{
        width: 15rem;
        height: 18rem;
        cursor: pointer;
    }
    .propDesc{
        display: flex;
        flex-direction: column;
    }
    img{
        object-fit: cover;
        width: 100%;
        height: 100%;
        box-shadow: ${props=> props.theme.boxShadow.low};
    }

    .title{
        font-size: ${props=> props.theme.fontSizes.fs1};
        font-weight: bold;
    }
    .price{
        font-size: ${props=> props.theme.fontSizes.fs1};
        font-weight: 500;
    }
    .location{
        font-size: ${props=> props.theme.fontSizes.fs1};
    }
    .rating{
        display: flex;
        gap: 10px;
        button{
            padding: 3px 5px;
            background-color: ${props=>props.theme.colors.primary};
            color: ${props=>props.theme.colors.white};
            font-weight: bold;
            border: none;
        }
    }
`;

export default LovedProperties;