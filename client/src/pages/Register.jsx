import axios from 'axios';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [role,setrole] = useState('');

  async function RegisterUser(e) {
    try {
      e.preventDefault();
      await axios.post('/register', {
        name,
        email,
        password
      });
      toast.success('Successfully registered');
    } catch (e) {
      toast.error('User already exists, try Login');
    }
  }

  return (
    <div className='w-[65%] h-[100%]  flex justify-center mt-32'>
      <div class='flex flex-col  p-1 w-7/12 h-1/4 justify-evenly'>
        <p className='text-center  text-4xl mb-4'>Register</p>
        <form className='flex flex-col ' onSubmit={RegisterUser}>
          <input
            type='text'
            placeholder='your name'
            className='border border-[#EFEEEF] rounded-2xl px-4 py-2 mb-2'
            value={name}
            onChange={(e) => setname(e.target.value)}
          ></input>
          <input
            type='email'
            placeholder='your email'
            className='border border-[#EFEEEF] rounded-2xl px-4 py-2 mb-2'
            value={email}
            onChange={(e) => setemail(e.target.value)}
          ></input>
          <input
            type='password'
            placeholder='password'
            className='border border-[#EFEEEF] rounded-2xl px-4 py-2 mb-2'
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          ></input>
          <button className='w-[100%] bg-indigo-500 p-2 text-white rounded-2xl hover:bg-indigo-600'>
            Register
          </button>
        </form>
        <div className='flex justify-center'>
          <p className='text-slate-400 mr-1 mt-2'>Already a member? </p>
          <NavLink to={'/login'} className='underline mt-2'>
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
