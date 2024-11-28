import React, { useEffect, useState } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import axios from "axios";

const Admin = () => {
  const { getToken } = useKindeAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = await getToken();
        const res = await fetch(
          `https://hospitalityhomiesdev.kinde.com/api/users`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, [getToken]);

  return (
    <div>
      <h1>Organization Users</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading users...</p>
      )}
    </div>
  );
};

export default Admin;
