import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://reqres.in/api/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data.data);
      })
      .catch((error) => {
        console.error('Error fetching user information:', error);
      });
  }, [userId]);

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
        <div className='bg-blue-400'>
        <Link to="/" className="block mt-4 text-white p-2">Back</Link>
        </div >
      {user && (
        <div className="grid grid-cols-2 items-center justify-center px-12 mt-12">
          
            <img src={user.avatar} alt={user.first_name} className="w-40 h-40 rounded-full mb-4 "/>
          
          <div className='bg-[#e5e5e5] p-4 rounded-xl'>
            <p>First Name: {user.first_name}</p>
            <p>Last Name: {user.last_name}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default UserDetails;
