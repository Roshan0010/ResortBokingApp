import React from 'react'
import { NavLink } from 'react-router-dom';

const HomeListings = ({place}) => {
  return (
    <div>
     {place.photos?.[0] &&(
        <NavLink to={'/place/'+place._id} className=' max-height-100 p-1  flex flex-col cursor-pointer hover:scale-110 hover:ease-in hover:translate-y-1 duration-200'>
            <img src={place.photos?.[0]} alt="" className='rounded-xl object-cover w-full h-full aspect-square'/>
            
              <p className=''>{place.address}</p>
              <p className='text-sm text-gray-500'>{place.title.slice(0,40)}..</p>
              <p> ${place.price} <p className='inline-flex text-gray-500'>night</p></p>
            
        </NavLink>
     )
     }
    </div>
  )
}

export default HomeListings;