import React from 'react';
import styled from 'styled-components';

const ListSearch = () => {
  return (
    <ListSearchCont>
        <h1 className="heading">Search</h1>

        <form className='list-form' >
            <div className="dest">
                <h2>Destination</h2>
                <input type="text" name="destination" id = "" />
            </div>
            <div className="date">
                <h2>Check-in date</h2>
                <input type="text" name="date" id = "" />
            </div>
            <div className="options">
                <h2 className='options-head' >Options</h2>
                <div className="option">
                    <h3 className="option-label">Min price (per night)</h3>
                    <input type="text" name="" id="" />
                </div>
                <div className="option">
                    <h3 className="option-label">Max price (per night)</h3>
                    <input type="text" name="" id="" />
                </div>
                <div className="option">
                    <h3 className="option-label">Adult</h3>
                    <input type="text" name="" id="" />
                </div>
                <div className="option">
                    <h3 className="option-label">Children</h3>
                    <input type="text" name="" id="" />
                </div>
                <div className="option">
                    <h3 className="option-label">room</h3>
                    <input type="text" name="" id="" />
                </div>
            </div>
            <button className='search-btn' >Search</button>
        </form>

    </ListSearchCont>
  );
}

const ListSearchCont = styled.div`
    background-color: ${props=>props.theme.colors.secondary};
    margin: 2rem 0rem;
    flex: 1.5;
    border-radius: 10px;
    padding: 0.3rem;
    h1, h2, h3{
        color: ${props=>props.theme.colors.gray};
    }

    .heading{
        font-size: ${props=>props.theme.fontSizes.fs3};
        padding: 0.5rem;
    }

    .list-form{
        padding: 0.5rem;
    }

    .dest, .date{
        margin-bottom: 0.3rem;
        h2{
            font-size: ${props=>props.theme.fontSizes.fs1};
            font-weight: 500;
        }
        input{
            width: 100%;
            height: 2rem;
            outline: none;
            border: none;
            font-size: ${props=>props.theme.fontSizes.fs1};
            color: ${props=>props.theme.colors.gray};
            font-weight: 500;
            padding: 3px;
        }
    }

    .options{
        margin: 1rem 0rem;
        .options-head{
            font-size: ${props=>props.theme.fontSizes.fs1};
            font-weight: 500;
        }

        .option{
            display: flex;
            padding: 0px 5px;
            justify-content: space-between;
            margin: 0.5rem 0rem;

            input{
                width: 25%;
                height: 1.8rem;
                outline: none;
            }

        }
        .option-label{
            font-size: 0.9rem;
            font-weight: 400;
        }

        
    }
    
    
    .search-btn{
        background-color: ${props=>props.theme.colors.primaryBtn};
        color: ${props=>props.theme.colors.white};
        width: 100%;
        padding: 0.7rem 0rem;
        margin: 0.4rem 0rem;
        border: none;
        font-size: ${props=>props.theme.fontSizes.fs1};
        font-weight: bold;
        cursor: pointer;
    }

`

export default ListSearch;