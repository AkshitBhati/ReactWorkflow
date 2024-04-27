import React from 'react'
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../../redux/user/UserSlice';

const Profile = () => {
  const dispatch = useDispatch()
  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/auth/signout', {
        method: "POST",
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        console.log("Error response:", res.status, data);
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <button onClick={handleSignOut}>Signout</button>  
    </div>
  )
}

export default Profile
