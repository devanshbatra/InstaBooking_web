import React from 'react';
import styled from 'styled-components';
import {featuredItemList} from '../mocks/homeMock';
import theme from '../theme';
import useFetch from '../hooks/useFetch';
const Featured = () => {

    const {loading, data, error} = useFetch("http://localhost/hotels/countByCity?cities=bankok,newyork,sydney");


  return (
    <FeaturedCont>
        {loading? "Loading, please wait...":(
            <>
                {
                    featuredItemList.map((item, i)=>(
                        <FeaturedItem key={item.name}>
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