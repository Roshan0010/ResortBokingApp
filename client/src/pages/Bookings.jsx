import axios from 'axios';
import { format } from 'date-fns';
import differenceInCalendarDays from 'date-fns/esm/differenceInCalendarDays';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { toWords } from 'number-to-words';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { HiOutlineMoon } from 'react-icons/hi';
import { FaRegCreditCard } from 'react-icons/fa';

const Bookings = () => {
const [bookings,setBookings]=useState([]);
useEffect(() =>{
  const token=localStorage.getItem('token');
  console.log(token)
  axios.get('/bookings', {
    headers: {
      Authorization:`Bearer ${token}`
    }
  }).then((response) =>{
setBookings(response.data);
});
},[]);



  return (
    <div>

{bookings?.length > 0 &&
      bookings.map((booking) => (
        <div key={booking.id} className=''>
        <NavLink to={'/account/bookings/'+booking._id} className="mt-3 bg-slate-100 flex  cursor-pointer rounded-2xl overflow-hidden gap-3 h-36 ">
    <div className=' bg-slate-700 w-48'>
        {
          booking.place.photos.length>0 &&(
            <img className='object-cover  h-full ' src={booking.place.photos[0]}/>
          )
        }
    </div>
    <div className='py-3 w-full flex flex-col gap-2'>
      <p className='w-[95%] text-xl border-b border-gray-300 pb-2 mb-1'>{booking.place.title}</p>
    <p className='flex items-center gap-1'>{<MdOutlineCalendarMonth/>}{format(new Date(booking.checkIn), 'yyyy-MM-dd')}-&gt;{<MdOutlineCalendarMonth/>} 
    {format(new Date(booking.checkOut), 'yyyy-MM-dd')}</p> 
    <div className='flex gap-1 text-xl items-center'>
    <p className="inline-flex">
  <p className="capitalize inline-flex items-center">
  <p>{<HiOutlineMoon/>}</p> 
    {toWords(
      differenceInCalendarDays(
        new Date(booking.checkOut),
        new Date(booking.checkIn)
      )
    )}
  
{<p className='pl-1'>Nights |</p>}
    
  </p>
</p>
    <p className='pl-1'>{<FaRegCreditCard/>}</p>
    <p>Total Price : ${booking.price}</p>
    </div>
    
    </div>
    
    </NavLink>
      
        </div>
      ))}

    </div>
  )
}

export default Bookings;