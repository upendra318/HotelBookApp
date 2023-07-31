import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Hotels() {
    const [hotels, setHotels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://hotels-api-4ltr.onrender.com/api/hotels")
            .then((res) => res.json())
            .then((data) => {
                setHotels(data);
            })
    }, [])

    const handleHotelDetails = (id, slug) => {
        navigate(`/hotelInfo/${id}?slug=${slug}`);
    }

    return (
        <div>
            <ul className='list-container'>
                {
                    hotels.map(hotel => {
                        return (
                            <div key={hotel.id} className='grid-item' onClick={() => handleHotelDetails(hotel.id, hotel.slug)}>
                                <img src={hotel.thumbnail} alt={hotel.slug} />
                                <div className='details'>
                                    <li>{hotel.address}</li>
                                    <p>${hotel.pricePerNight} night</p>
                                </div>
                            </div>

                        )
                    })
                }
            </ul >
        </div >
    )
}

export default Hotels