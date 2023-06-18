import axios from 'axios';
import React, { useEffect, useState } from 'react'
import HomeListings from '../components/HomeListings';

const Home = () => {
const [places,setPlaces]=useState([]);
useEffect(() => {
axios.get('/places').then(response=>{
setPlaces(response.data);
});
},[])
console.log(places);


return (
  <div className='grid mt-8 grid-cols-2 md:grid-cols-3 gap-7 lg:grid-cols-4 px-3'>
    {places.length > 0 &&
      places.map((place) => (
        <HomeListings key={place.id} place={place} />
      ))}
  </div>
);

}

export default Home;