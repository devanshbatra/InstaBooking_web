import React from 'react'
import styled from 'styled-components';
import { propertyTypes } from '../mocks/homeMock';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { SearchContext } from '../contexts/searchContext';
import hostName from '../mocks/hostName';

const PropertyList = () => {

    const {data, error, loading } = useFetch(`${hostName}/hotels/countByType`);
    const [propertyType, setPropertyType] = useState("");
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

    const handleClick=(type)=>{
        setPropertyType(type);
        dispatch({type: "NEW_SEARCH", payload: {destination: "", dates, options}});

        navigate('/hotels', {state: {destination: "Enter destination", dates, options, propertyType: type}});

    }

  return (
    <PropTypeCont>
        {loading?("Loading, Please wait..."):(
            <>
                {data?.map((ptype, i)=>(  //just to make sure that this data array is not empty.
                    <div className="propertyItem" key={ptype.type}  onClick={()=>handleClick(ptype.type.toLowerCase())} >
                        <img src={propertyTypes[i].imageSrc} alt={ptype.type} />
                        <div className="propTypeTitle">
                            <p className="title">{ptype.type+"s"}</p>
                            <p className="subtitle">{ptype.count} {ptype.type+"s"}</p>
                        </div>
                    </div>
                ))}
            </>
        )}
    </PropTypeCont>
  );
}

const PropTypeCont = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 1024px;
    align-items: center;
    justify-content: space-between;

    .propertyItem{
        cursor: pointer;
        width: 10rem;
        height: 7rem;
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
        text-transform: capitalize;
    }
    .subtitle{
        font-size: ${props=> props.theme.fontSizes.fs0};
    }


`

export default PropertyList;