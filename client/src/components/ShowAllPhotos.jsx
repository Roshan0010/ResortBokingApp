import React, { useContext } from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { UserContext } from '../UserContex';

const ShowAllPhotos = ({ info,setShowAllPhotos }) => {
const { setShowNav } = useContext(UserContext);

  
  return (

    <div className='my-20'>
      <button className='fixed left-5 top-5 text-3xl rounded-full  hover:bg-slate-100' 
      onClick={()=>{setShowNav(true);
    setShowAllPhotos(false);}}
      >

      <FaAngleLeft/></button>
      {
        info?.photos?.length > 0 && info.photos.map((photo) => 
      
          <div key={photo} className='w-[50vw]  object-contain mt-2'>
            <img src={photo} />
          </div>
        
      )
      }

    </div>
  );
};

export default ShowAllPhotos;
