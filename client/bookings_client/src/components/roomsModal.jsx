import React, { useState } from 'react';
import styled from 'styled-components';
import {TbCircleX} from 'react-icons/tb';
import useFetch from '../hooks/useFetch';

function RoomsModal({setOpen, hotelId}) {

  const {data, loading, error} = useFetch(`http://localhost:80/hotels/getRooms/${hotelId}`);

  const [selectedRooms, setSelectedRooms] = useState([]);

  const handleSelect = (e)=>{
    const selected = e.target.checked;
    const value = e.target.value;

    setSelectedRooms( selected? [...selectedRooms, value] : selectedRooms.filter(item=> item!==value) );
    console.log(selectedRooms);
  }


  return (
    <ModalCont>
      {loading? "loading...":(
        <div className="modal-wrapper">
            <TbCircleX onClick={()=> setOpen(false)} />
            {data.map(roomType=>(
              <div className="room-categ" key={roomType._id} >
                <div className="room-title">{roomType.title}</div>
                <div className="room-desc">{roomType.desc}</div>
                <div className="room-maxPeople">{roomType.maxPeople}</div>
                {roomType.roomNumbers.map(room=>(
                  <div className='room-number' key={room._id} >
                    <label htmlFor={room._id} >{room.number}</label>
                    <input type="checkbox"  id={room._id} name={room.number} value={room._id} onChange={handleSelect} />
                  </div>
                ))}
              </div>
            ))}
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
        background-color: white;
    }
`

export default RoomsModal;
