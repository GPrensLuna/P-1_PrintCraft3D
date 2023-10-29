import React, { useState, useEffect } from "react";
import { URL } from "../../config.js";
import styles from "./UserList.module.css";

export default function UserList() {
  const [users, setUsers] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedValues, setEditedValues] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${URL}User`);
        if (!response.ok) {
          throw new Error("Error al obtener usuarios");
        }

        const data = await response.json();
        setUsers(data.users);
        console.log(data.users);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId, user) => {
    setEditingUserId(userId);
    setEditedValues(user);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditedValues({
      firstName: "",
      lastName: "",
      birthDate: "",
      phoneNumber: "",
      email: "",
      password: "",
      role: "",
    });
  };

  const handleSaveEdit = async (userId) => {
    try {
      const response = await fetch(`${URL}User/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedValues),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
      }

      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, ...editedValues } : user
      );
      setUsers(updatedUsers);

      handleCancelEdit();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={styles.tableContainer}>
      <h2>Lista de Usuarios</h2>
      {users ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Fecha de Nacimiento</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Password</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {editingUserId === user.id ? (
                    <div className={styles.inputContainer}>
                      <label className={styles.inputLabel}>Nombre:</label>
                      <input
                        className={styles.editInput}
                        type="text"
                        value={editedValues.firstName}
                        onChange={(e) =>
                          setEditedValues({
                            ...editedValues,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    user.firstName
                  )}
                </td>
                <td>
                  {editingUserId === user.id ? (
                    <div className={styles.inputContainer}>
                      <label className={styles.inputLabel}>Apellido:</label>
                      <input
                        className={styles.editInput}
                        type="text"
                        value={editedValues.lastName}
                        onChange={(e) =>
                          setEditedValues({
                            ...editedValues,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    user.lastName
                  )}
                </td>
                <td>
                  {editingUserId === user.id ? (
                    <div className={styles.inputContainer}>
                      <label className={styles.inputLabel}>
                        Fecha de Nacimiento:
                      </label>
                      <input
                        className={styles.editInput}
                        type="date"
                        value={editedValues.birthDate}
                        onChange={(e) =>
                          setEditedValues({
                            ...editedValues,
                            birthDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    user.birthDate
                  )}
                </td>
                <td>
                  {editingUserId === user.id ? (
                    <div className={styles.inputContainer}>
                      <label className={styles.inputLabel}>Teléfono:</label>
                      <input
                        className={styles.editInput}
                        type="tel"
                        value={editedValues.phoneNumber}
                        onChange={(e) =>
                          setEditedValues({
                            ...editedValues,
                            phoneNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    user.phoneNumber
                  )}
                </td>
                <td>
                  {editingUserId === user.id ? (
                    <div className={styles.inputContainer}>
                      <label className={styles.inputLabel}>Email:</label>
                      <input
                        className={styles.editInput}
                        type="email"
                        value={editedValues.email}
                        onChange={(e) =>
                          setEditedValues({
                            ...editedValues,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editingUserId === user.id ? (
                    <div className={styles.inputContainer}>
                      <label className={styles.inputLabel}>Password:</label>
                      <input
                        className={styles.editInput}
                        type="password"
                        value={editedValues.password}
                        onChange={(e) =>
                          setEditedValues({
                            ...editedValues,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    user.password
                  )}
                </td>
                <td>
                  {editingUserId === user.id ? (
                    <div className={styles.inputContainer}>
                      <label className={styles.inputLabel}>Rol:</label>
                      <input
                        className={styles.editInput}
                        type="text"
                        value={editedValues.role || ""} // Si editedValues.role es null, muestra una cadena vacía
                        onChange={(e) =>
                          setEditedValues({
                            ...editedValues,
                            role: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    user.role
                  )}
                </td>
                <td className={styles.actions}>
                  {editingUserId === user.id ? (
                    <>
                      <button onClick={() => handleSaveEdit(user.id)}>
                        Guardar
                      </button>
                      <button onClick={handleCancelEdit}>Cancelar</button>
                    </>
                  ) : (
                    <button onClick={() => handleEdit(user.id, user)}>
                      Editar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.loadingMessage}>
          Cargando información de usuarios...
        </p>
      )}
    </div>
  );
}
