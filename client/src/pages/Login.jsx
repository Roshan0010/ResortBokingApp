import {React,useContext,useState} from 'react'
import { NavLink, Navigate} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserContext } from '../UserContex';

const Login = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [redirect,setredirect]=useState(false);
    const {setUser,user}=useContext(UserContext);
    async function LoginHandler(e) {
      e.preventDefault();
      try {
        const {data}=await axios.post('/login', { email, password });
        console.log(data);
        setUser(data);
        console.log("seting data to login user");
        console.log(user);
        toast.success('Login Successful');
        setredirect(true);
       
      } catch (error) {
        console.log(error);
        toast.error('Login Failed');
      }
    }
    if(redirect) {
      return <Navigate to={'/'}/>
    }


    
  return (
    <div className='w-[65%] h-[100%]  flex justify-center mt-32'>
    <div class="flex flex-col  p-1 w-7/12 h-1/4 justify-evenly">
    <p className='text-center  text-4xl mb-4'>Login</p>
    <form className='flex flex-col' onSubmit={LoginHandler}>
    
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
    <button className='w-[100%] bg-indigo-500 p-2 text-white rounded-2xl hover:bg-indigo-600'>Login</button>
    </form>
    <div className='flex justify-center'>
    <p className=' text-slate-400 mr-1 mt-2 '>Don't Have an Account Yet? </p>
    <NavLink to={'/register'} className="underline mt-2">Register now </NavLink>
    </div>
    

    </div>
    
    </div>
  )
}

export default Login;