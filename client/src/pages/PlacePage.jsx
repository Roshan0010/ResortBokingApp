import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'

import { useParams } from 'react-router';
import { UserContext } from '../UserContex';
import ShowAllPhotos from '../components/ShowAllPhotos';
import {CiLocationOn} from 'react-icons/ci';
import BookWidget from '../components/BookWidget';
import Photos from '../components/Photos';


const PlacePage = () => {
    const [info,setInfo]=useState(null);
    const {id}=useParams();
    const [showAllPhotos,setShowAllPhotos]=useState(false);
    const { setShowNav } = useContext(UserContext);

    

    //total price  widget functionaliry
let diff 


console.log(info);
    useEffect(() =>{
        if(!id){
            return;
        }
     axios.get(`/places/${id}`).then(response =>{
     setInfo(response.data);
     })
    },[id]);
    if(!info)return '';

    if(showAllPhotos){
        setShowNav(false);
        return ( 
          <ShowAllPhotos info={info} setShowAllPhotos={setShowAllPhotos}/>
        )
    }
  return (
    <div className=' w-[77vw] p-6 ' >
    <p className='text-2xl'>{info.title}</p>
    <a className='inline-flex items-center gap-1' target='blank'>
        <CiLocationOn/>
        <p className=' underline my-2' >{info.address}</p>
    </a>
    
  <Photos info={info} showAllPhotos={showAllPhotos} setShowAllPhotos={setShowAllPhotos}/>
    
    
    <div className='grid grid-col-1 md:grid-col-[2fr_1fr] lg:grid-cols-[2fr_1fr]  mt-8 mb-4 mx-2'>
    <div className='flex flex-col mr-10 '>
        <p className='text-lg font-semibold'>Description</p>
     <p>  {info.description}</p> 
     <p>Check-in:  {info.checkIn}</p>
     <p>Check-out: {info.checkOut}</p>
     <p>Max number of guest:{info.maxGuest} </p>
      
    </div>
    <BookWidget info={info}/>
    </div>
    <div>
        <p className='text-xl font-bold  '>Extra info</p>
        <p className='text-gray-500 p-1'>{info.extraInfo}</p>
        
    </div>
    </div>
  )
}

export default PlacePage;
// form update for checkIn and checkOut Compalsory