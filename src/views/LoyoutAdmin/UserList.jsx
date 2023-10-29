import React, { useState, useEffect } from "react";
import { URL } from "../../config.js";

export default function UserList() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${URL}User`);
        if (!response.ok) {
          throw new Error("Error al obtener usuarios");
        }

        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      {users ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Cargando información de usuarios...</p>
      )}
    </div>
  );
}
