import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import {CiLocationOn} from 'react-icons/ci';
import Photos from '../components/Photos';
import { format } from 'date-fns';
import differenceInCalendarDays from 'date-fns/esm/differenceInCalendarDays';
import { toWords } from 'number-to-words';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { HiOutlineMoon } from 'react-icons/hi';
import { UserContext } from '../UserContex';
// import ShowAllPhotos from '../components/ShowAllPhotos';



const BookingPage = () => {
    const [booking,setBooking]=useState(null);
    const {id}=useParams();
    const { setShowNav } = useContext(UserContext);
    const [showAllPhotos,setShowAllPhotos] = useState(false);
    
    useEffect(() => {
        if (id) {
          const token=localStorage.getItem('token');
          axios.get('/bookings',{
            headers: {
              Authorization: `Bearer ${token}`
            }}).then((response) => {
            const foundBooking = response.data.find(({ _id }) => _id === id);
            if (foundBooking) {
              setBooking(foundBooking);
            
            }
          });
        }
      }, [id]);
    
    //   if(showAllPhotos){
    //     setShowNav(false);
    //     console.log(booking.place);
    //     return ( 
    //       <ShowAllPhotos info={booking.palce} setShowAllPhotos={setShowAllPhotos}/>
    //     )
    // }


if(!booking){
    return '';
}
  return (
    <div className='' >
    <p className='text-2xl'>{booking.place.title}</p>
    <a className='inline-flex items-center gap-1' target='blank'>
        <CiLocationOn/>
        <p className=' underline my-2' >{booking.place.address}</p>
    </a>

    <div className='grid grid-col-1 md:grid-col-[4fr_1fr] lg:grid-cols-[6fr_1fr] bg-gray-300  p-5 rounded-2xl'>
   <div className=''>
  <p className='text-2xl sm:text-xl lg:text-3xl mb-3'>Your Booking Information</p>
   <p className='flex items-center gap-1'>
      <MdOutlineCalendarMonth/>
      {format(new Date(booking.checkIn), 'yyyy-MM-dd')} -&gt;
      <MdOutlineCalendarMonth/>
      {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
    </p> 

    <div className='flex gap-1 text-xl items-center'>
      <p className='inline-flex'>
        <p className='capitalize inline-flex items-center'>
          <HiOutlineMoon/>
          {toWords(
            differenceInCalendarDays(
              new Date(booking.checkOut),
              new Date(booking.checkIn)
            )
          )}
          <p className='pl-1'>Nights </p>
        </p>
      </p>
    </div>


   </div>
   <div className=' flex justify-center'>
   <div className='bg-indigo-500 p-2 text-white rounded-2xl hover:bg-indigo-600 lg:w-40 h-28 md:w-40 flex flex-col justify-center gap-2 items-center sm:w-full'>
    <p className=''>Total Price</p>
    <p className='text-xl md:text-2xl lg:text-3xl '>${booking.price}</p>
   </div>
  
   </div>
    </div>
    <div className=' m-1 my-5'>
    <Photos info={booking.place} setShowAllPhotos={setShowAllPhotos}/>
    </div>
    
    </div>
  )
}

export default BookingPage;