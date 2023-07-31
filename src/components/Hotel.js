import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';


import ReserveDialog from './ReserveDialog';

function Hotel({ user }) {
    const navigate = useNavigate();
    const [hotelInfo, setHotelInfo] = useState(null)
    const [searchParam, setSearchParam] = useSearchParams();
    const [open, setOpen] = useState(false);

    let slug = searchParam.get("slug");

    useEffect(() => {
        fetch(`https://hotels-api-4ltr.onrender.com/api/hotels/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                setHotelInfo((prev) => {
                    return { ...prev, ...data }
                });
            })
    }, [slug])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function addBooking(bookingObj) {
        try {
            const docRef = await addDoc(collection(db, "bookings"), bookingObj)
            navigate('/profile')
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const handleReserve = ({ startDateValue,
        endDateValue,
        guests,
        finalPrice }) => {
        addBooking({
            name: hotelInfo.name,
            address: hotelInfo.address,
            checkin: startDateValue.format('ddd, MMM D, YYYY'),
            checkout: endDateValue.format('ddd, MMM D, YYYY'),
            noofguests: guests,
            price: finalPrice,
            email: user.email
        })
    }

    const guests = +hotelInfo?.rooms?.[0]['content'].split(' ')[0];

    return (
        <div>
            {hotelInfo &&
                <>
                    <h4>{hotelInfo.name}</h4>
                    <div className='images-container'>
                        {hotelInfo.images?.map((imgObj) => {
                            return (
                                <img key={imgObj.id} alt='interior-image' src={imgObj.img} />
                            )
                        })}
                    </div>
                    {
                        hotelInfo.rooms?.map(room => {
                            return (
                                <span key={room.id} style={{ fontSize: "0.8rem", fontWeight: "bold", color: "grey", marginRight: "1rem" }}>{room.content}</span>
                            )
                        })
                    }
                    <h4 style={{ lineHeight: 2, textAlign: "justify", margin: '1rem 0' }}>{hotelInfo.aboutThePlace}</h4>
                    <h3>What this place offers!!</h3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                        <ul style={{ marginTop: '1rem' }}>
                            {
                                hotelInfo.features?.map(feature => {
                                    return (
                                        <li key={feature.id} style={{ listStyle: "none", lineHeight: '2', fontSize: '1rem', fontWeight: 'bold' }}>{feature.text}</li>
                                    )
                                })
                            }
                        </ul>
                        <Button sx={{ border: '1px solid lightblue', fontSize: '12px', fontWeight: 'bold' }} onClick={handleClickOpen}>Reserve</Button>
                        <ReserveDialog
                            pricePerNight={hotelInfo.pricePerNight}
                            open={open}
                            onClose={handleClose}
                            onReserve={handleReserve}
                            noOfGuests={guests}
                        />
                    </div>
                </>
            }

        </div>
    )
}

export default Hotel