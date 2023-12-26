import React, { useState } from 'react';
import { NavLink,useLocation } from 'react-router-dom';
import { IoAddSharp } from 'react-icons/io5';
import PlacesForm from '../components/PlacesForm';
import { useEffect } from 'react';
import axios from 'axios';
import ListingPlaces from '../components/ListingPlaces';





const Places = () => {
  const [places,setPlaces]=useState([]);
const [show,setShow]=useState(true);

  const {pathname}= useLocation();
  const lastDir=pathname.split('/')[3];

  useEffect(()=>{
    const token=localStorage.getItem('token');
   if(show){
    axios.get('/user-places',{
      headers: {
        Authorization: `Bearer ${token}`
      }}).then(({data})=>{
      setPlaces(data);
      });
   }
   
  },[show])
 

  return (
   

    <div>
     
      {lastDir === undefined && (
        <div className='flex flex-col justify-center flex-inline'>
        <div className='flex  justify-center'>
        <div className='bg-indigo-500 p-2 text-white rounded-3xl hover:bg-indigo-600 mt-5'>
            <NavLink to={'/account/places/new'} className='flex items-center gap-2'>
              <IoAddSharp />
              Add New Places
            </NavLink>
          </div>
        </div>
          
          <div>
          {  places.length > 0 && places.map(place =>(
           <div>
           <ListingPlaces place={place}/>
           </div>
          ))
          }
          </div>
        </div>
      )}
      {lastDir !== undefined && (
        <PlacesForm setShow={setShow}/>
      )}
      
    </div>
  );
};

export default Places;
