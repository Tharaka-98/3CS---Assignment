import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch('https://reqres.in/api/users?page=1')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.data); // Set the user data to state
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const getUserInfo = (userId) => {
    fetch(`https://reqres.in/api/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedUser(data.data); // Set selected user information
      })
      .catch((error) => {
        console.error('Error fetching user information:', error);
      });
  };

  const handleClick = (userId) => {
    getUserInfo(userId);
  };

  return (
    <div className="p-10 bg-[#fdf2f8] ">
      <h1 className="text-3xl font-bold mb-12 text-center">User List</h1>
      <div className="grid grid-cols-2 gap-4">
        {users.map((user) => (
          <div key={user.id} className="border-2 p-4 rounded cursor-pointer hover:bg-gray-100"
               onClick={() => handleClick(user.id)}>
            <img src={user.avatar} alt={user.first_name} className="w-24 h-24 rounded-full mx-auto mb-2" />
            <p className="text-lg font-bold">{user.first_name} {user.last_name}</p>
            <p className="text-gray-600">{user.email}</p>
          </div>
        ))}
      </div>
      {selectedUser && (
        <div className="mt-8 items-center justify-center flex-col flex border-2 mx-auto max-w-md">
          <h2 className="text-xl font-bold mb-2">Selected User Information:</h2>
          <p>ID: {selectedUser.id}</p>
          <p>Email: {selectedUser.email}</p>
          <p>First Name: {selectedUser.first_name}</p>
          <p>Last Name: {selectedUser.last_name}</p>
          <img src={selectedUser.avatar} alt={selectedUser.first_name} className="w-24 h-24 rounded-full mt-2" />
        </div>
      )}
    </div>
  );
}

export default UserList;