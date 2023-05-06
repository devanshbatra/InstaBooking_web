import React, {useState} from 'react';
import Navbar from '../../components/navbar';
import Header from '../../components/header';
import styled from 'styled-components';
import {IoLocationSharp} from 'react-icons/io5'
import { hotelPhotos } from '../../mocks/hotelMock';
import EmailBar from '../../components/emailBar';
import Footer from '../../components/footer';
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from 'react-icons/bs';
import {TbCircleX} from 'react-icons/tb';

function Hotel() {


    const [slideIndex, setSlideIndex] = useState(0);
    const [openModal, setOpenModal] = useState(false);

    const handleOpen = (i)=>{
        setSlideIndex(i);
        setOpenModal(!openModal);
    }

    const goRight = ()=>{
        setSlideIndex( (slideIndex+1)%hotelPhotos.length );
    }

    const goLeft = ()=>{
        var newIndex = slideIndex==0 ? hotelPhotos.length-1 : slideIndex-1;
        setSlideIndex(newIndex);
    }

  return (
    <>
        <Navbar/>
        <Header type="list" />

        {openModal && (
            <ModalWrapper  >
                <BsFillArrowLeftCircleFill size={50} color='white' className='modal-icons arrows' onClick={goLeft} />
                <div className="image-full-size-cont">
                    <TbCircleX size={40} color='white' className='modal-icons xIcon' onClick={()=>setOpenModal(false)} />
                    <img src={hotelPhotos[slideIndex].src} alt="slideimg" />
                </div>
                <BsFillArrowRightCircleFill size={50} color='white' className='modal-icons arrows' onClick={goRight} />
            </ModalWrapper>
        )}

        <HotelWrapper>
            {/* title section */}
            <div className="title">
                <div className="upper-title">
                    <h2 className="name">Tower Street Apartments</h2>
                    <div className="location">
                        <IoLocationSharp size = {11} color='gray' />
                        5, Baztowa, Ring Road, 45-655 Warsaw, Poland
                    </div>
                    <p className="location-highlight">Execellent Location - 500m from center</p>
                    <div className="offer">Book a stay over $114 at this property and get a free airport taxi</div>
                </div>

                <ReserveBtn >Reserve or Book Now!</ReserveBtn>
            </div>

            {/* Photos section */}
            <div className='hotel-photos'>
                {hotelPhotos.map((photo, i)=>(
                    <img className='photo-item' src={photo.src} key={photo.id} alt="hotel"
                        onClick={()=>handleOpen(i)}
                    />
                ))}
            </div>

            {/* description section */}
            <div className="description">
                <div className="desc-section">
                    <h2 className="desc-heading">Luxury and Convenience Meet in the Heart of Warsaw</h2>
                    <p className="desc">
                    Welcome to the luxurious Hotel Polonia in Warsaw! Our elegant rooms offer breathtaking views of the city skyline and feature comfortable beds and modern amenities. Wake up to a delicious breakfast buffet served in our sophisticated dining room. Unwind with a cocktail in our cozy lounge or enjoy a workout in our fully-equipped fitness center. Our attentive staff is always on hand to ensure you have a memorable stay. Conveniently located in the heart of Warsaw, our hotel is the perfect base for exploring this vibrant city.
                    </p>
                </div>
                <div className="price-section">
                    <h2 className="price-head">Perfect for a 9-night stay</h2>
                    <p className="price-desc">Located in the real heart of Warsaw, this property has an exellent location score of 9.8!</p>
                    <div className="price-container">
                        <span className="price">$976</span>
                        <span className="duration">(9 nights)</span>
                    </div>
                    <ReserveBtn >Reserve or Book Now!</ReserveBtn>
                </div>
            </div>
        </HotelWrapper>

        <EmailBar/>
        <Footer/>


    </>
  );
}

const ModalWrapper = styled.div`
    width: 100vw;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #17171761;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .modal-icons{
        cursor: pointer;
        z-index: 2;
    }
    .arrows{
        margin: 0 2rem;
    }

    .image-full-size-cont{
        width: 70%;
        height: 80%;
        position: relative;
        .xIcon{
            position: absolute;
            top: 10px;
            right: 10px;
        }
        img{
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
        img::selection{
            color: transparent;
        }
    }


`;

const HotelWrapper = styled.div`
    max-width: 1024px;
    margin: 2rem auto;

    .title{
        display: flex;
        justify-content: space-between;
        margin-bottom: 3px;
        .location{
            font-size: 0.9rem;
            color: ${props=>props.theme.colors.gray};
        }
        .location-highlight{
            color: ${props=>props.theme.colors.primary};
            font-weight: 500;
        }
        .offer{
            color: ${props=>props.theme.colors.green};
            font-weight: 500;
        }
        .reserve-btn{
            background-color: ${props=>props.theme.colors.primaryBtn};
            color: ${props=>props.theme.colors.white};
            padding: 3px 6px;
            font-size: ${props=>props.theme.fontSizes.fs1};
            font-weight: bold;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            align-self: flex-start;
        }
    }

    .hotel-photos{
        display: flex;
        flex-wrap: wrap;
        .photo-item{
            margin: 1px;
            width: 33%;
        }
    }

    .description{
        display: flex;
        margin: 1.5rem 0rem;
        .desc-section{
            flex: 3;
            color: ${props=>props.theme.colors.gray};
        }
        .price-section{
            display: flex;
            flex-direction: column;
            flex: 1;
            background-color: ${props=>props.theme.colors.lightblue};
            padding: 1rem;
            border-radius: 6px;
            .price-head{
                color: ${props=>props.theme.colors.gray};
                font-size: ${props=>props.theme.fontSizes.fs1};
                font-weight: 700;
                margin-bottom: 5px;
            }
            .price-desc{
                line-height: 1.3;
                font-size: 0.9rem;
            }

            .price-container{
                margin: 0.4rem 0rem;
                font-size: ${props=>props.theme.fontSizes.fs2};
            }
            .price{
                font-weight: bold;
                margin-right: 3px;
            }

            .duration{
                color: ${props=>props.theme.colors.gray};
            }

        }
    }


`;

const ReserveBtn = styled.button`
    background-color: ${props=>props.theme.colors.primaryBtn};
    color: ${props=>props.theme.colors.white};
    padding: 5px 10px;
    font-size: 0.9rem;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    align-self: flex-start;
`;

export default Hotel;