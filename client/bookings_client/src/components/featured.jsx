import React from 'react';
import styled from 'styled-components';
import {featuredItemList} from '../mocks/homeMock';
import theme from '../theme';
const Featured = () => {
  return (
    <FeaturedCont>
        {
            featuredItemList.map((item)=>(
                <FeaturedItem key={item.name}>
                    <img src={item.imageSrc} alt={item.name} />
                    <div className="featuredTitles">
                        <h1> {item.name} </h1>
                        <h2>{item.properties} properties</h2>
                    </div>
                </FeaturedItem>
            ))
        }
    </FeaturedCont>
  );
}

const FeaturedCont = styled.div`
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