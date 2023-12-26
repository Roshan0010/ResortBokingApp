import './App.css';
import Header  from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import {  UserContextProvider } from './UserContex';
import Account from './pages/Account';
import PlacePage from './pages/PlacePage';
import { BaseUrl } from './config';


axios.defaults.baseURL = BaseUrl;
axios.defaults.withCredentials=true;
function App() {
  return (
    <UserContextProvider>
    <div className='w-[100vw]' >
    
    <Toaster/>
     <Header/>

   
      <div className=' w-[100%] flex justify-center relative '>
      <Routes >
      <Route index element={<Home/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/" element={<Home/>} />
      <Route path="/place/:id" element={<PlacePage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/account/" element={<Account/>} />
      <Route path="/account/bookings" element={<Account/>} />
      <Route path="/account/bookings/:id" element={<Account/>} />
      <Route path="/account/places" element={<Account/>} />
      <Route path="/account/places/new" element={<Account/>} />
      <Route path="/account/places/:id" element={<Account/>} />
      
      </Routes>
      </div>
  
      
      
    </div>
    </UserContextProvider>
  );
}

export default App;


