import React from 'react'
import styled from 'styled-components'
import { SearchListItem } from '../mocks/listMock';
import theme from "../theme";

const ListResults = () => {
  return (
    <ListResultCont>
      {SearchListItem.map(item => (
        <ItemWrapper>
          {/* left section */}
          <div className="left-section">
            <img className='image' src={item.imageSrc} alt="" />
          </div>

          {/* middle section */}
          <div className="middle-section">
            <span className="hotel-name">{item.name}</span>
            <span className="dist">{item.distanceFromCenter} from center</span>
            {item.airportTaxi && (
              <span className="airport">Free airport Taxi</span>
            )}
            <span className="desc">{item.description}</span>
            <div className="components">
              {item.components.map((comp, i, components) => (
                
                <div className="comp">
                  <div className="dot"></div>
                  <span>{comp}</span>
                </div>
              ))}
            </div>

            {item.freeCancellation && (
              <div className="free-cancel">
                <span className='free-cancel-title'>Free Cancellation</span>
                <span className='free-cancel-subtitle' >You can cancel later, so lock in this great price today!</span>
              </div>
            )}

          </div>

          {/* right section */}
          <div className="right-section">
            <div className="rating">
              <div className="rating-btn">{item.rating}</div>
              <p className="rating-review">
                {item.rating < 4 ? "Poor" : item.rating < 8 ? "Good" : "Excellent"}
              </p>
            </div>
            
            <div className="price-section">
              <span className="price">${item.price}</span>
              <span className="taxes">includes taxes and fares</span>
              <button className='avail-btn' >See availability</button>
            </div>


          </div>

        </ItemWrapper>
      ))}
    </ListResultCont>
  )
}

const ListResultCont = styled.div`
    flex: 3;
`

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  justify-content: space-between;
  padding: 0.5rem;
  border: 2px solid ${props=>props.theme.colors.lightgray};
  border-radius: 10px;
  gap: 0.5rem;
  .left-section{
    flex: 1;
    width: 20rem;
    .image{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .middle-section{

    display: flex;
    flex-direction: column;
    flex: 2;
    .hotel-name{
      color: ${props=>props.theme.colors.primaryBtn};
      font-size: ${props=>props.theme.fontSizes.fs2};
      font-weight: bold;
    }

    .dist{
      color: ${props=>props.theme.colors.gray};
      font-weight: 500;
      margin-bottom: 3px;
    }

    .airport{
      background-color: ${props=>props.theme.colors.green};
      color: white;
      font-weight: 500;
      font-size: ${props=>props.theme.fontSizes.fs0};
      width: fit-content;
      padding: 2px 6px;
      border-radius: 5px;
    }

    .desc{
      font-weight: 700;
      color: ${props=>props.theme.colors.gray};
    }
    .components{
      display: flex;
      justify-content: space-between;
      span{
        font-weight: 400;
      }
    }
    .comp{
      display: flex;
      align-items: center;
      span{
        color: ${props=>props.theme.colors.gray};
        font-size: 0.9rem;
        margin: 0rem 2px;
      }
      .dot{
        width: 0px;
        height: 0px;
        border: 3px solid ${props=>props.theme.colors.gray};
        border-radius: 50%;
        display: inline;
      }
    }

    .free-cancel{
      display: flex;
      flex-direction: column;
      .free-cancel-title{
        color: ${props=>props.theme.colors.green};
        font-weight: bold;
      }
      .free-cancel-subtitle{
        color: ${props=>props.theme.colors.green};
        font-weight: 300;
        font-size: 0.8rem;
      }
    }

  }

  .right-section{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    .rating{
      align-self: flex-end;
      display: flex;
      background-color: ${props=>props.theme.colors.primary};
      color: ${props=>props.theme.colors.white};
      padding: 1px 6px;
      font-weight: bold;
      border-radius: 5px;
      
      .rating-btn{
        margin-right: 7px;
      }

    }

    .price-section{
      align-self: flex-end;
      display: flex;
      flex-direction: column;
      align-items: flex-end; //for its children

      .price{
        font-size: ${props=>props.theme.fontSizes.fs2};
        font-weight: bold;
        color: ${props=>props.theme.colors.gray};
      }
      .taxes{
        font-size: 0.9rem;
        font-weight: 500;
        color: ${props=>props.theme.colors.gray};
      }
      .avail-btn{
        background-color: ${props=>props.theme.colors.primaryBtn};
        color: ${props=>props.theme.colors.white};
        padding: 3px 6px;
        font-size: ${props=>props.theme.fontSizes.fs1};
        font-weight: bold;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }

    }

  }


`

export default ListResults;