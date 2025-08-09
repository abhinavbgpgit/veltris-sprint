import React from "react";
import { useParams } from "react-router-dom";


const UserPage = () => {
  const { userId } = useParams();
//   const user = demoUsers.find(u => String(u.id) === String(userId));

console.log("papap")
  return (
    <div className="p-8 mt-52">
       {userId}
     
        <div>
          <h2 className="text-2xl font-bold mb-4">User Details</h2>
          <div className="bg-white rounded-lg shadow p-6 max-w-md">
            {/* <p className="text-lg font-semibold mb-2">Name: {user.name}</p> */}
            {/* Add more user details here as needed */}
          </div>
        </div>
     
    </div>
  );
};

export default UserPage;