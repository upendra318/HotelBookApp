import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase';

function Profile({ user }) {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        const fetchBookings = async () => {
            await getDocs(query(
                collection(db, "bookings"),
                where("email", "==", user?.email)
            ))
                .then((querySnapshot) => {
                    const newData = querySnapshot.docs
                        .map((doc) => ({ ...doc.data(), id: doc.id }));
                    setBookings(newData);
                })
        }
        fetchBookings();
    }, [])

    return (
        <div>
            <div className='profile'>
                <Avatar alt={user?.name} src={user?.picture} />
                <h4>{user?.name}</h4>
            </div>
            <h3>Booking History</h3>
            <table>
                <tr>
                    <th className='tname'>Hotel Name</th>
                    <th>Hotel Address</th>
                    <th>Check in</th>
                    <th>Check out</th>
                    <th>Number of guests</th>
                    <th>Price</th>
                </tr>

                {bookings.map(obj => {
                    return (
                        <tr key={obj.id}>
                            <td className='tname'>{obj.name}</td>
                            <td>{obj.address}</td>
                            <td>{obj.checkin}</td>
                            <td>{obj.checkout}</td>
                            <td>{obj.noofguests}</td>
                            <td>${obj.price}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default Profile