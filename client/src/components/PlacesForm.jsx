import{ React,useEffect,useState} from 'react'
import {useNavigate, useParams } from 'react-router-dom';

import { BsWifi,BsDot, BsTrash3} from 'react-icons/bs';
import {BiRadio } from 'react-icons/bi';
import { TbCar} from 'react-icons/tb';
import { FaTv } from 'react-icons/fa';
import { HiOutlineHandThumbUp } from "react-icons/hi2";
import{AiOutlineStar,AiFillStar} from "react-icons/ai";

import axios from 'axios';
import { toast } from 'react-hot-toast';




function PlacesForm({setShow}) {

  const {id}=useParams();
 console.log(id);
    const decPlace = 'Discover a tranquil oasis for your perfect holiday getaway. Immerse yourself in luxury, comfort, and breathtaking views. Indulge in world-class amenities, exquisite cuisine, and rejuvenating spa treatments. Unwind in stylishly designed rooms and suites, each offering a seamless blend of elegance and modernity. Enjoy a myriad of recreational activities and entertainment options. Experience unparalleled hospitality and personalized service...'
    const  [title,setTitle]=useState('');
    const[address,setAddress]=useState('');
    const [addedPhotos,setAddedPhotos]=useState([]);
    const [photoLink,setPhotoLink]=useState('');
    const [description,setDescription]=useState('');
    const [perks,setPerks]=useState([]);
    const [extraInfo,setExtraInfo]=useState('');
    const [checkIn,setCheckin]=useState('');
    const [checkOut,setCheckout]=useState('');
    const [maxGuest,setMaxGuest]=useState(1);
    const [price,setPrice]=useState(0);
    const navigate = useNavigate();

useEffect(()=>{
if(!id){
  return;
}
axios.get('/places/'+id).then(response=>{
  const {data}=response;
  setTitle(data.title);
  setDescription(data.description);
  setExtraInfo(data.extraInfo);
  setCheckin(data.checkin);
  setCheckout(data.checkout);
  setAddedPhotos(data.photos);
  setAddress(data.address);
  setPrice(data.price);
  setMaxGuest(data.maxGuest);
  setPerks(data.perks);
  
})
},[id]);

    function HandleCbClick(ev){
        const {checked,name}=ev.target;
        if(checked){
        setPerks([...perks,name]);
        }
        else{
         setPerks([...perks.filter(selectName=>selectName!==name)]);
        }
        console.log(perks);
     }
   
     function uploadPhoto(ev) {
       const files = ev.target.files;
       const data = new FormData();
   
       for (let i = 0; i < files.length; i++) {
         data.append('photos', files[i]);
       }
       axios.post('/upload', data, {
         headers: { 'Content-type': 'multipart/form-data' }
       }).then(res => {
         const {data:filenames}=res;
         // Assuming setAddedPhotos is a state setter function
         setAddedPhotos(prev => [...prev, ...filenames]);
         console.log(addedPhotos);
       }).catch((error) => {
        toast.sucess(error.message);
         console.error('Error uploading photos:', error);
       });
     }
   
   
   
    async function addPhotoByLink(e){
     e.preventDefault();
       const {data:filename}=await axios.post('/upload-by-link',{link:photoLink})
       setAddedPhotos(prev=>{
        return [...prev,filename.secure_url];
       });
       setPhotoLink('');
     }
   
    async function savePlace(ev){
      setShow(false);
   ev.preventDefault();
   const placeData={title,address,addedPhotos,
    description,perks,extraInfo,
    checkIn,checkOut,maxGuest,price,
  };

  if(id){
    //updata
   
    await axios.put('/places',{id,...placeData});
  }
  else {
    //new
   const token=localStorage.getItem('token');
    await axios.post('/places',placeData,{
      headers: {
        Authorization: `Bearer ${token}`
      }});
  }

   
  // <Navigate to="/account/places"/>
  setShow(true);
  navigate("/account/places");
   
   }
   function removePhoto(filename){
    setAddedPhotos([...addedPhotos.filter(photo=> photo!==filename)]);
   }

   function selectAsMainPhoto(filename){
    const addedPhotosWithoutSelected=addedPhotos.filter(photo=> photo!==filename);
    const newAddedPhotos=[filename,...addedPhotosWithoutSelected];
    setAddedPhotos(newAddedPhotos);
   }


  return (
    <form className='w-full mt-3 px-1' onSubmit={savePlace}>
            <span className='text-2xl px-1 flex'>Title</span>
            <span className='text-sm text-gray-400 p-1'>Title for your place should be nice and crisp</span>
            <input
            value={title}
            onChange={ev=>setTitle(ev.target.value)}
              type='text'
              placeholder='Unique Design Retreat, Organic Nature House, Off-Grid Cabin'
              className='focus:outline-none w-full border border-[#EFEEEF] rounded-2xl px-4 py-2 mb-2'
            />

            <span className='text-2xl px-1 flex'>Address</span>
            <span className='text-sm text-gray-400 p-1'>Address to this place</span>
            <input
            value={address}
            onChange={ev=>setAddress(ev.target.value)}
              type='text'
              placeholder='Munnar, Kerala, India'
              className='focus:outline-none w-full border border-[#EFEEEF] rounded-2xl px-4 py-2 mb-2'
            />

            <span className='text-2xl px-1'>Photos</span>
            <span className='text-sm text-gray-400 p-1 flex'>more = better </span>
            <div>
              <input
                value={photoLink}
                onChange={ev=>setPhotoLink(ev.target.value)}
                type='text'
                placeholder='Add using a link ...jpg'
                className='focus:outline-none w-[85%] border border-[#EFEEEF] rounded-2xl px-4 py-2 mb-2'
              />
              <button
              onClick={addPhotoByLink}
               className='bg-gray-200 ml-2 p-2 rounded-2xl px-3 hover:bg-gray-300 hover:scale-110 duration-300'>
                Add Photos
              </button>
            </div>
            
            <div className='grid grid-cols-3 gap-2 lg:grid-cols-4 md:grid-col-4'>
  {addedPhotos.length > 0 && addedPhotos.map((link) => (
    <div className='w-55 h-40 relative' key={link}>
      <img className='rounded-2xl w-full h-full object-cover' src={link} alt='' />
      <BsTrash3 onClick={()=>removePhoto(link)} className='absolute bottom-1 right-1 text-white bg-black p-2 w-8 h-8 bg-opacity-50 rounded-2xl cursor-pointer'/>
      {/* star  wala funcinality */}
      {
        link===addedPhotos[0] &&(
          <AiFillStar onClick={()=>selectAsMainPhoto(link)} className='absolute bottom-1 left-1 text-white bg-black p-2 w-8 h-8 bg-opacity-50 rounded-2xl cursor-pointer'/>
        )
      }
      {
        link!==addedPhotos[0] &&(
          <AiOutlineStar onClick={()=>selectAsMainPhoto(link)} className='absolute bottom-1 left-1 text-white bg-black p-2 w-8 h-8 bg-opacity-50 rounded-2xl cursor-pointer'/>
        )
      }
     
    </div>
  ))}
  <label className='border w-55 h-40 bg-transparent rounded-2xl p-8 text-2xl text-gray-500 cursor-pointer flex justify-center items-center'>+
  <input type='file' multiple className='hidden' onChange={uploadPhoto}/>
  </label>
</div>

                  {/* photos sction pending */}
            <span className='mt-2 text-2xl px-1 flex'>Description</span>
            <span className='text-sm text-gray-400 p-1 '>Description of the place</span>



            <textarea
              placeholder={decPlace}
              value={description}
            onChange={ev=>setDescription(ev.target.value)}
              className='focus:outline-none w-full border border-[#EFEEEF] rounded-3xl px-4 py-2 mb-2 resize-none'
              rows={5}
            />
            <span className='text-2xl px-1 flex'>Perks</span>
            <span className='text-sm text-gray-400 p-1'>Select all the perks for your place</span>


            <div className='flex justify-evenly'>
            <label className='flex align-center w-3/12 rounded-2xl items-center justify-center py-8 m-2 border '>
                  <input type="checkbox" checked={perks.includes('wifi')} name="wifi" onChange={HandleCbClick} className=' flex flex-col' />
                  <BsWifi className='mx-1' />
                  Wifi
                </label>
                <label className='flex align-center w-3/12 rounded-2xl items-center justify-center py-3 pl-3 m-2 border '>
                  <input type="checkbox" checked={perks.includes('parking')} name="parking"  onChange={HandleCbClick} className=' flex flex-col' />
                  <TbCar className='mx-1' />
                  free parking sport
                </label>
                <label className='flex align-center w-3/12 rounded-2xl items-center justify-center py-8 m-2 border '>
                  <input type="checkbox" checked={perks.includes('tv')} name="tv" onChange={HandleCbClick} className=' flex flex-col' />
                  <FaTv className='mx-1' />
                  TV
                </label>
                <label className='flex align-center w-3/12 rounded-2xl items-center justify-center py-8 m-2 border '>
                  <input type="checkbox" checked={perks.includes('radio')} name="radio" onChange={HandleCbClick} className=' flex flex-col' />
                  <BiRadio className='mx-1' />
                  Radio
                </label>
                <label className='flex align-center w-3/12 rounded-2xl items-center justify-center py-8 m-2 border '>
                  <input type="checkbox" checked={perks.includes('pet')} name="pet" onChange={HandleCbClick} className=' flex flex-col' />
                  <HiOutlineHandThumbUp className='mx-1' />
                  Pets
                </label>
               
                <label className='flex align-center w-3/12 rounded-2xl items-center justify-center py-8 m-2 pl-4 border '>
                  <input type="checkbox" checked={perks.includes('private-entrace')} name="private-entrace" onChange={HandleCbClick} className=' flex flex-col' />
                  <BsDot className='mx-1' />
                  Private entrance
                </label>
            </div>
            
            <span className='text-2xl px-1'>Extra info</span>
            <span className='text-sm text-gray-400 p-1 flex'>house rules, etc  </span>
            <textarea
            value={extraInfo}
            onChange={ev=>setExtraInfo(ev.target.value)}
              placeholder={decPlace}
              className='focus:outline-none w-full border border-[#EFEEEF] rounded-3xl px-4 py-2 mb-2 resize-none'
              rows={5}
            />
            <span className='text-2xl px-1'>Check in&out times</span>
            <span className='text-sm  p-1 flex'>house rules, etc  </span>
            <div className=' flex justify-between'>
            <div className='flex flex-col w-1/5 mb-5 '>
              <span>Check in time</span>
              <input type='text' 
              placeholder='11'
              value={checkIn}
            onChange={ev=>setCheckin(ev.target.value)}
              className='border rounded-xl p-1 focus:outline-none'/>
            </div>
            <div className='flex flex-col w-1/5'>
              <span>Check out time</span>
              <input type='text'
              placeholder='14'
              value={checkOut}
            onChange={ev=>setCheckout(ev.target.value)}
             className='border rounded-xl p-1 focus:outline-none'/>
            </div>
            <div className='flex flex-col w-1/5 '>
              <span>Max members</span>
              <input type='number'
              value={maxGuest}
            onChange={ev=>setMaxGuest(ev.target.value)}
              className='border rounded-xl p-1 focus:outline-none'/>
            </div>
            <div className='flex flex-col w-1/5 '>
              <span>Price per night</span>
              <input type='number' 
              value={price}
            onChange={ev=>setPrice(ev.target.value)}
              className='border rounded-xl p-1 focus:outline-none' />
            </div>
            </div>
            <button className='w-[100%] m-1 bg-indigo-500 p-2 text-white rounded-2xl hover:bg-indigo-600'>Save</button>
  
          </form>
  )
}

export default PlacesForm;