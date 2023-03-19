import React, { useState } from 'react';
import {FaBed, FaCalendarAlt} from "react-icons/fa";
import {ImMan} from "react-icons/im";
import styled from 'styled-components';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';

const HeaderSearch = () => {

    const [openDate, setOpenDate] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);

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

    const handleOptions = (name, operation)=>{
        setOptions((prev)=>{
            return {...prev, [name]: operation==='i'?options[name]+1 : options[name]-1}
        });
    }

  return (
    <HeaderSearchCont>
        <div className="searchItem">
            <FaBed color='lightgray' />
            <input type="text" placeholder='Where are you going?' />
        </div>
        <div className="searchItem" >
            <FaCalendarAlt color='lightgray' />
            <span className='searchText' onClick={()=>setOpenDate(!openDate)} >
                {format(dates[0].startDate, "dd/mm/yyyy")} to {format(dates[0].endDate, "dd/mm/yyyy")}
            </span>
            {openDate && <DateRange
                editableDateInputs = {true}
                ranges={dates}
                onChange={(item)=>setDates([item.selection])}
                moveRangeOnFirstSelection = {false}
                className= 'date'
            />}
        </div>
        <div className="searchItem">
            <ImMan color='lightgray' />
            <span className='searchText' 
                onClick={()=>setOpenOptions(!openOptions)}
            >{options.adult} adults . {options.children} children . {options.room} room</span>
            { openOptions && <div className="options">
                <div className="optionItem">
                    <div className="optionName">Adult</div>
                    <div className="optionSelector">
                        <button className="optionBtn" 
                            onClick={()=>handleOptions('adult', 'd')}
                            disabled={options.adult<=1}
                            >-</button>
                        <div className="optionValue">{options.adult}</div>
                        <button className="optionBtn" onClick={()=>handleOptions('adult', 'i')} >+</button>
                    </div>
                </div>
                <div className="optionItem">
                    <div className="optionName">Children</div>
                    <div className="optionSelector">
                        <button className="optionBtn" 
                            onClick={()=>handleOptions('children', 'd')}
                            disabled={options.children<=0}
                        >-</button>
                        <div className="optionValue">{options.children}</div>
                        <button className="optionBtn" onClick={()=>handleOptions('children', 'i')} >+</button>
                    </div>
                </div>
                <div className="optionItem">
                    <div className="optionName">Room</div>
                    <div className="optionSelector">
                        <button className="optionBtn" 
                            disabled={options.room<=1}
                            onClick={()=>handleOptions('room', 'd')}
                        >-</button>
                        <div className="optionValue">{options.room}</div>
                        <button className="optionBtn" onClick={()=>handleOptions('room', 'i')} >+</button>
                    </div>
                </div>
            </div>}
        </div>
        <div className="searchItem">
            <button className='searchBtn' >Search</button>
        </div>
    </HeaderSearchCont>
  );
}

const HeaderSearchCont = styled.div`
    background-color: ${props=>props.theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 25px;
    margin: 10px 0px;
    border-radius: 10px;
    border: 3px solid ${props=>props.theme.colors.secondary};
    position: relative;
    top: 85px;
    .searchItem{
        display: flex;
        align-items: center;
        gap: 5px;
        span{
            color: ${props=>props.theme.colors.lightgray};
        }
        input{
            border: none;
            outline: none;
        }
    }
    .searchBtn{
        cursor: pointer;
        display: inline-block;
        padding: 5px 10px;
        color: ${props=>props.theme.colors.white};
        background-color: ${props=>props.theme.colors.primaryBtn};
        border: none;
        cursor: pointer;
    }
    .searchText{
        cursor: pointer;
    }
    .date{
        position: absolute;
        top: 50px;
        z-index: 2;
    }
    
    
    //options
    .options{
        position: absolute;
        z-index: 2;
        top: 55px;
        color: black;
        display: flex;
        flex-direction: column;
        box-shadow: 6px 4px 8px 2px rgb(33, 32, 32, 0.08);
        padding: 15px;
        font-size: ${props=>props.theme.fontSizes.fs0};
        border-radius: 10px;
        background-color: #fafafa;

        .optionItem{
            display: flex;
            gap: 10px;
            margin: 5px 0px;
            justify-content: space-between;
            align-items: center;
        }
        .optionSelector{
            display: flex;
            gap: 10px;
            align-items: center;
            justify-content: space-between;
        }
        .optionBtn{
            padding: 5px 10px;
            background-color: white;
            border: 1px solid ${props=>props.theme.colors.primary};
            border-radius: 4px;
            cursor: pointer;
        }

        .optionBtn:disabled{
            cursor: not-allowed;
        }


    }
`;

export default HeaderSearch;