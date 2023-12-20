import React, { useContext, useEffect } from 'react'
import { HiOutlinePaperAirplane } from 'react-icons/hi';
import { BiSearchAlt2 } from 'react-icons/bi';
import { IoIosOptions } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContex';


const Header = () => {

  // console.log(user.name);

  const {showNav}=useContext(UserContext);
  const {user}=useContext(UserContext);
  
  function hideDiv() { 
    console.log("hideDiv");
    console.log(showNav); 
    if(showNav){
      return "bg-[#FFFEFE] flex justify-around border border-[#EFEEEF] p-4";
  }
  else {
   return "hidden";
  }
}


  useEffect(()=>{
  hideDiv();
  },[showNav]);
  
  return (
    <div className=" ">
      <div className={hideDiv()}>
        <Link to={'/Home'} className="flex items-center">
          <HiOutlinePaperAirplane className="w-8 h-10 text-indigo-600 " />
          <span className="font-bold text-xl text-indigo-600">distant</span>
        </Link>

        <div className="flex justify-center rounded-3xl p-2  items-center border border-[#EFEEEF] shadow-md">
          <div className="px-3">Anywhere</div>
          <div className="h-8 border-l border-x-2 rounded-md border-black opacity-30 mx-2"></div>

          <div className="px-3">Any Week</div>
          <div className="h-8 border-l border-x-2 rounded-md border-black opacity-30 mx-2"></div>

          <div className="px-3">Add guest</div>
        
         <BiSearchAlt2 className='h-7 w-7 bg-indigo-500 rounded-full p-1.5 text-white'  />
       
           
         
        </div>
        

        <div className='flex items-center  rounded-2xl p-1 gap-3 border-[#EFEEEF] shadow-md ml-5 '>
        <IoIosOptions className="w-6 h-8 text-slate-600 "/>
          <Link to={user?'/account':'/login'} className='flex items-center'>
          <FaUserCircle className="w-8 h-10 text text-slate-500 "/>
          {user?(<div className='font-light m-1 p-1'>{user.name}</div>):(<div/>)}
          </Link>
          
        </div>
    
 
        
      </div>
    </div>
  )
}

export default Header;