import React from 'react'
import AccNav from '../components/AccNav';
import { useLocation } from 'react-router';
import Places from './Places';
import Bookings from './Bookings';
import Profile from './Profile';
import BookingPage from './BookingPage';




const Account = () => {
    const {pathname}= useLocation();
    const lastDir=pathname.split('/')[2];
    const id = pathname.split('/')[3];
   
    console.log(lastDir);
  return (
 
    <div className='w-[80%]'>
    <AccNav/>
    {lastDir===undefined &&(<Profile/>)
    }
    {lastDir==='bookings' && !id &&(<Bookings/>)
    }
    {(lastDir==='places') &&(<Places/>)
    }
    {
     id &&(
      <BookingPage/>
     )
    }
   
    </div>
  )
}

export default Account;