
import{TbGridDots} from 'react-icons/tb';



const Photos = ({info,showAllPhotos ,setShowAllPhotos}) => {
   




  return (
    <div className=' relative '>
    <div  className='hello grid gap-2 grid-cols-[2fr_1fr_1fr] w-[80] rounded-xl overflow-hidden  '>
    <div className='  object-cover bg-slate-900'>
    {info.photos?.[0] &&(
       
        <img  src={info.photos?.[0]} 
        onClick={()=>setShowAllPhotos(true)}
          className='aspect-square object-cover cursor-pointer'/>  
    )
    }
    
    </div>
    <div className='grid '>
    {info.photos?.[1] &&(
        <img src={info.photos?.[1]} onClick={()=>setShowAllPhotos(true)}
          className='aspect-square object-cover cursor-pointer'/>  
    )
    }
    <div className='overflow-hidden'>
    {info.photos?.[2] &&(
        <img src={info.photos?.[2]} onClick={()=>setShowAllPhotos(true)}
          className='aspect-square object-cover cursor-pointer'/>  
    )
    }
    </div>
    
    </div>
    <div className='grid '>
    {info.photos?.[3] &&(
        <img src={info.photos?.[3]} onClick={()=>setShowAllPhotos(true)}
          className='aspect-square object-cover cursor-pointer'/>  
    )
    }
    <div className='overflow-hidden'>
    {info.photos?.[4] &&(
        <img src={info.photos?.[4]} onClick={()=>setShowAllPhotos(true)}
          className='aspect-square object-cover cursor-pointer'/>  
    )
    }
    </div>
    
    </div>
    </div>
    <button onClick={()=>setShowAllPhotos(true)} className='absolute bottom-3 right-3 py-1 px-3 bg-white rounded-lg inline-flex items-center gap-1 hover:bg-gray-100 '><TbGridDots></TbGridDots>show all photos</button>
    </div>
  )
}

export default Photos;