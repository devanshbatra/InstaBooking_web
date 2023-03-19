import React from 'react'
import styled from 'styled-components';
import { lovedProp } from '../mocks/homeMock';

const LovedProperties = () => {
  return (
    <LovedPropCont>
        {lovedProp.map(ptype=>(
            <div className="propertyItem" key={ptype.name}>
                <img src={ptype.imageSrc} alt={ptype.name} />
                <div className="propDesc">
                    <span className="title">{ptype.name}</span>
                    <span className="location">{ptype.location}</span>
                    <span className="price">starting from {ptype.startPrice}$</span>
                    <div className="rating">
                        <button className="rating_btn">{ptype.rating}</button>
                        <p className="ratingReview">
                            {ptype.rating<4?"Poor": ptype.rating<8? "Good" : "Excellent"}
                        </p>
                    </div>
                </div>
            </div>
        ))}
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