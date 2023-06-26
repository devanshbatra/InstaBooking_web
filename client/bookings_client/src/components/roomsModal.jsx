import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import {TbCircleX} from 'react-icons/tb';
import useFetch from '../hooks/useFetch';
import { SearchContext } from '../contexts/searchContext';
import axios from 'axios';
import hostName from '../mocks/hostName';

function RoomsModal({setOpen, hotelId}) {

  const {data, loading, error} = useFetch(`${hostName}/hotels/getRooms/${hotelId}`);

  const [selectedRooms, setSelectedRooms] = useState([]);
  const [reserved, setReserved] = useState(false);

  const handleSelect = (e)=>{
    const selected = e.target.checked;
    const value = e.target.value;

    setSelectedRooms( selected? [...selectedRooms, value] : selectedRooms.filter(item=> item!==value) );
    // console.log(selectedRooms);
  }

  const {dates} = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate)=>{
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    let list = [];
    while(date<=end){
      list.push(new Date(date).getTime());
      date.setDate(date.getDate()+1);
    }

    return list;

  }

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  
  const isAvailable = (room) =>{
    //some means give true if any of the elements passes the test inside.
    // console.log("room.unavailableDates:" , room.unavailableDates);
    const isFound = room.unavailableDates.some(date=>
      allDates.includes(new Date(date).getTime())
    );

    if(isFound) return true;
    else return false;

  }

  const handleClick = async (e) =>{
    // console.log(dates);
    if(selectedRooms.length==0) return;
    try{
      await Promise.all(
        selectedRooms.map(roomId=>{
          const res = axios.put(`${hostName}/rooms//updateAvailability/${roomId}`, {dates: allDates});
          return res.data;
        })
        );
        setReserved(true);
        setTimeout(()=>{setOpen(false)},2000)
    }catch(err){
      console.log(err);
    }
    
  }


  return (
    <ModalCont>
      {loading? "loading...":(
        <div className="modal-wrapper">
            <TbCircleX className='exit' onClick={()=> setOpen(false)} />
            <h2 className="select-head">Select your rooms</h2>
            <div className="categ-cont">
              {data.map(roomType=>(
                <div className="room-categ" key={roomType._id} >
                  <div className="left-section">
                    <div className="room-title">{roomType.title}</div>
                    <div className="room-desc">{roomType.desc}</div>
                    <div className="capacity">
                      <span>Max people: </span>
                      <div className="room-maxPeople">{roomType.maxPeople}</div>
                    </div>
                  </div>
                  <div className="right-section">
                    {roomType.roomNumbers.map(room=>(
                      <div className='room-number' key={room._id} >
                        <label className='room-label' htmlFor={room._id} >{room.number}</label>
                        <input type="checkbox"  id={room._id} name={room.number} value={room._id} onChange={handleSelect} disabled={isAvailable(room)} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className={reserved? "btn-reserved": "r-button"} 
              disabled = {reserved || (selectedRooms.length==0) }
              onClick={handleClick} >{reserved?"Success": "Reserve Now"}</button>
        </div>
      )}
    </ModalCont>
  )
}


const ModalCont = styled.div`
    width: 100vw;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #17171761;
    display: flex;
    justify-content: center;
    align-items: center;
    .modal-wrapper{
      position: relative;
        .exit{
          font-size: 1.3rem;
          cursor: pointer;
          position: absolute;
          top: 2px;
          right: 2px;
        }
        background-color: white;
        padding: 1rem;
        .select-head{
          font-size: 1.2rem;
          font-weight: 400;
        }
        .categ-cont{
          display: flex;
          flex-direction: column;
        }
        .room-categ{
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin: 0.5rem 0rem;
          gap: 3rem;
        }

        .room-title{
          font-size: 1.1rem;
          font-weight: bold;
        }

        

        .capacity{
          display: flex;
          font-size: 0.9rem;
          gap: 4px;
          .room-maxPeople{
            font-weight: bold;
          }
          .checkbox:disabled{
            background-color: black;
            cursor: not-allowed;
          }
        }
        .right-section{
          display: flex;
          flex-wrap: wrap;
        }
        .room-number{
          display: flex;
          flex-direction: column;
          padding: 2px;
          .room-label{
            font-size: ${props=>props.theme.fontSizes.fs0};
          }
          
        }

        .r-button{
          cursor: pointer;
          padding: 10px 10px;
          color: ${props=>props.theme.colors.white};
          background-color: ${props=>props.theme.colors.primaryBtn};
          border: none;
          font-weight: 500;
          font-size: 1rem;
          border-radius: 5px;
          width: 100%;
          margin: 1rem 0rem 0.3rem 0rem;
          transition: all 0.3s ease;
        }

        .btn-reserved{
          cursor: not-allowed;
          padding: 10px 10px;
          color: ${props=>props.theme.colors.white};
          background-color: ${props=>props.theme.colors.green};
          border: none;
          font-weight: 500;
          font-size: 1rem;
          border-radius: 5px;
          width: 100%;
          margin: 1rem 0rem 0.3rem 0rem;
          transition: all 0.3s ease;
        }

        .r-button:hover{
          background-color: ${props=>props.theme.colors.primary};
          
        }


    }
`

export default RoomsModal;
