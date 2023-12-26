import React, { useContext } from 'react';
import { UserContext } from '../UserContex';
import { Navigate, useParams } from 'react-router';
// import axios from 'axios';
import Places from './Places';

const Profile = () => {
  const { user, setUser, ready } = useContext(UserContext);

  async function logout() {
    localStorage.removeItem('token');
    setUser(null);
  }

  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = 'profile';
  }

  if (!ready) {
    return 'Loading...';
  }

  if (!user && ready) {
    return <Navigate to={'/login'} />;
  }

 

  return (
    <div className='w-[100%]'>
      {/* Profile Page */}
      {user === undefined && !ready ? (
        <div>Loading...</div>
      ) : (
        subpage === 'profile' && (
            <div className='flex justify-center'> 
          <div className='m-5 flex flex-col w-[35%] text-center justify-center'>
            Logged in as {user.name} ({user.email})
            <button
              onClick={logout}
              className='m-4 px-[50px] bg-indigo-500 p-2 text-white rounded-2xl hover:bg-indigo-600'
            >
              Logout
            </button>
          </div>
          </div>
        )
      )}

      {subpage === 'places' && <Places />}
    </div>
  );
};

export default Profile;
