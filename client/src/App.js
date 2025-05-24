import React, { useEffect, useState } from 'react';
import { Users } from './Components/Apis/Apis';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Users();
        console.log("Fetched users response:", response); // 🔍 inspect structure

        // Make sure you're accessing the correct part of the response
        // Adjust this line if your API returns { users: [...] } or { data: { users: [...] } }
        setUsers(Array.isArray(response) ? response : response?.users || []);
      } catch (error) {
        console.log("Error in Fetching the user List:", error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      {Array.isArray(users) && users.length > 0 ? (
        users.map((item) => (
          <div key={item._id}>
            <h2>{item.fullName}</h2>
          </div>
        ))
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default App;
