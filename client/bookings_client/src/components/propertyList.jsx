import React from 'react'
import styled from 'styled-components';
import { propertyTypes } from '../mocks/homeMock';

const PropertyList = () => {
  return (
    <PropTypeCont>
        {propertyTypes.map(ptype=>(
            <div className="propertyItem" key={ptype.name}>
                <img src={ptype.imageSrc} alt={ptype.name} />
                <div className="propTypeTitle">
                    <p className="title">{ptype.name}</p>
                    <p className="subtitle">{ptype.properties} {ptype.name.toLowerCase()}</p>
                </div>
            </div>
        ))}
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
    }
    .subtitle{
        font-size: ${props=> props.theme.fontSizes.fs0};
    }


`

export default PropertyList;