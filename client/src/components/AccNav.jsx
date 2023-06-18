import React from 'react'
import { CiUser } from 'react-icons/ci';
import { FaBed } from 'react-icons/fa';
import { BsListUl } from 'react-icons/bs';
import { NavLink, useLocation } from 'react-router-dom';

const AccNav = () => {
    const {pathname}= useLocation();
    const lastDir=pathname.split('/')[2];

     //gives the last element in array 
    // const lastDir=patharr[patharr.length-1];
    function linkClass(type = null) {
        let classes = 'p-2 rounded-3xl m-1 pointer inline-flex';
        console.log(lastDir)
        if (type === lastDir) {
           
          classes +=
            ' bg-indigo-500 text-white translate-y-1 scale-110 hover:bg-indigo-600 duration-300';
        } else {
          classes += ' bg-gray-200';
        }
    
        return classes;
      }
  return (
    <div className='w-[100%] flex items-center text-center justify-center'>
        <nav className='flex items-center gap-2'>
          <NavLink to={'/account'} className={linkClass('account')}>
            <span className='flex items-center'>
              <CiUser className='mr-2' />
              <span>My Profile</span>
            </span>
          </NavLink>
          <NavLink to={'/account/bookings'} className={linkClass('bookings')}>
            <span className='flex items-center'>
              <BsListUl className='mr-2' />
              <span>My Bookings</span>
            </span>
          </NavLink>
          <NavLink to={'/account/places'} className={linkClass('places')}>
            <span className='flex items-center'>
              <FaBed className='mr-2' />
              <span>My Accommodations</span>
            </span>
          </NavLink>
        </nav>
      </div>
  )
}

export default AccNav;