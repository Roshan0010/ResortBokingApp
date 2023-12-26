import axios from 'axios';
import { differenceInBusinessDays } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

const BookWidget = ({info}) => {
    const [checkIn,setCheckIn]=useState('');
    const [checkOut,setCheckOut]=useState('');
    const [noOfGuest,setNoOfGuest]=useState(1);
    const [noOfDays,setNoOfDays]=useState(0);
    const [name,setName]=useState('');
    const [phNo,setPhNo]=useState('');
    const navigate=useNavigate('');
    
    
    useEffect(() => {
    
        
        if (checkIn && checkOut) {
            setNoOfDays(differenceInBusinessDays(new Date(checkOut), new Date(checkIn)));
          
        }
        
    
      }, [checkIn, checkOut]);
      

  async function BookingHandeler(e) { 
  e.preventDefault(); 
  const token=localStorage.getItem('token');
   const obj={checkIn,checkOut,noOfGuest:noOfGuest,name,phone:phNo,place:info._id ,price:noOfDays*info.price};
 const result= await axios.post('/booking',obj,{
  headers: {
    Authorization: `Bearer ${token}`
  }});
if(result){
  navigate(`/account/bookings`);
}
  console.log(obj);
   }


   
  return (
    <form on onSubmit={BookingHandeler}>
    <div className='border shadow-lg rounded-lg flex flex-col items-center text-md  '>
      <p className='p-2 text-2xl'>Price:${info.price}/per night</p>
      <div className=' border rounded-xl'>
      <div className=' border-b p-2 ' >
      <div className='flex  border-b gap-2 text-base  py-2' >
        <div className=' flex flex-col justify-center border-r pr-3 '>
        <label>Check In:</label>
        <input type='date' value={checkIn} onChange={ev=>setCheckIn(ev.target.value)}/>
         </div>
        <div  className='  flex flex-col justify-center pl-3'>
        <label>Check Out:</label>
        <input type='date' value={checkOut} onChange={ev=>setCheckOut(ev.target.value)}/>
        </div>
      </div>
      <div className='w-[100%]  px-1 py-2 '>
      <div className='flex flex-col'>
      <label>No of guest</label>
      <input className='border rounded-lg pl-3 py-1' type='number' 
      value={noOfGuest} onChange={ev=>setNoOfGuest(ev.target.value)} />
      </div> 
      </div>
      </div>
      {
        noOfDays>0 &&( 
            <div className=' w-full px-3 '>
        <div className='w-[100%] '>
      <div className='flex flex-col'>
      <label>Your Name:</label>
      <input className='border rounded-lg pl-3 py-1' type='text' 
      value={name} onChange={ev=>setName(ev.target.value)} />
      </div> 
      </div>
      <div className='w-[100%]  px-1 py-2 '>
      <div className='flex flex-col'>
      <label>Phone No:</label>
      <input className='border rounded-lg pl-3 py-1' type='tel' 
      value={phNo} onChange={ev=>setPhNo(ev.target.value)} />
      </div> 
      </div>
      </div>)
      }
      </div>
      
      
      <button className=' my-3 w-[92%] bg-indigo-500 p-2 text-white rounded-2xl hover:bg-indigo-600'
      >
     { (noOfDays<=0 )?(
        <span>reserve</span>
      ):(
        <span>Total: ${info.price*noOfDays}</span>)
      }
      </button>
      
     </div>
    </form>
  )
}

export default BookWidget;