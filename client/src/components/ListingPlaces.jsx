import React from 'react'
import {  NavLink } from 'react-router-dom';

const ListingPlaces = ({place}) => {
    const trimedDec = place.description.slice(0, 270) + '...';
  return (
    <NavLink to={'/account/places/'+place._id} className="min-w mt-3 bg-slate-100 flex m-1 p-3 rounded-xl cursor-pointer ">
    <div className='w-32 h-32 flex  shrink-0 p-1 '>
        {
          place.photos.length>0 &&(
            <img className='object-cover' src={place.photos[0]}/>
          )
        }
    </div>
     <div className=' p-3'>
     <p className='text-xl '>{place.title}</p>
     <p className='p-1 mt-1'>{
        place.description.length<300 ?
        (place.description):
        (trimedDec)
     }</p>
     </div>
    </NavLink>
  )
}

export default ListingPlaces;