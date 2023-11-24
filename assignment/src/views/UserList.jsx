import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://reqres.in/api/users?page=1')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleUserClick = (userId) => {
    // Navigate to user details page with the user ID
    navigate(`/user/${userId}`);
  };

  return (
    <div className="p-6">
        <div className='bg-blue-400'>
        <h2 className='text-xl text-center text-white p-2'>Title</h2>
        </div>
      <h1 className="text-3xl font-bold mb-4 mt-4">User List</h1>
      <div className="grid grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="border p-4 rounded cursor-pointer hover:bg-gray-100"
            onClick={() => handleUserClick(user.id)}
          >
            <img src={user.avatar} alt={user.first_name} className="w-24 h-24 rounded-full mx-auto mb-2" />
            <p className="text-lg font-bold">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-gray-600">{user.email}</p>
          </div>
        ))}
      </div>
      {/* {selectedUser && (
        <Link to={`/user/${selectedUser.id}`} className="block mt-4 text-blue-500">
          View Details
        </Link>
      )} */}
    </div>
  );
}

export default UserList;
