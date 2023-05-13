import React from 'react'
import styled from 'styled-components';
import { propertyTypes } from '../mocks/homeMock';
import useFetch from '../hooks/useFetch';

const PropertyList = () => {

    const {data, error, loading } = useFetch("http://localhost:80/hotels/countByType");

  return (
    <PropTypeCont>
        {loading?("Loading, Please wait..."):(
            <>
                {data?.map((ptype, i)=>(  //just to make sure that this data array is not empty.
                    <div className="propertyItem" key={ptype.type}>
                        <img src={propertyTypes[i].imageSrc} alt={ptype.type} />
                        <div className="propTypeTitle">
                            <p className="title">{ptype.type}</p>
                            <p className="subtitle">{ptype.count} {ptype.type}</p>
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