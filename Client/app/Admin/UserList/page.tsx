"use client";
import { useState, useEffect } from "react";
import { URL_BACKEND } from "@/config";
import { User } from "@/Ts/UserList";
import { UserRow } from "@/Components";


export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${URL_BACKEND}User`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Error al obtener usuarios");
                }

                const data = await response.json();

                setUsers(data.users);
            } catch (error) {
                console.error("Error al cargar usuarios:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleEditClick = (user: User) => {
        setEditingUser({ ...user });
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setEditingUser((prev) => {
            if (prev === null) return null;

            if (e.target.name in prev) {
                return {
                    ...prev,
                    [e.target.name]: e.target.value,
                };
            }
            return prev;
        });
    };

    const handleSaveEdit = async (userId: number) => {
        if (!editingUser) return;

        try {
            const response = await fetch(`${URL_BACKEND}User/${editingUser.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editingUser),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el usuario");
            }

            setUsers(
                users.map((user) =>
                    user.id === editingUser.id ? { ...editingUser } : user
                )
            );
            setEditingUser(null);
        } catch (error) {
            console.error("Error al guardar cambios:", error);
        }
    };

    if (loading) {
        return <p className="text-gray-600">Cargando información de usuarios...</p>;
    }

    const handleRoleChange = (userId: number, newRole: string) => {
        setEditingUser((prev) => {
            if (prev && prev.id === userId) {
                return { ...prev, roll: newRole };
            }
            return prev;
        });
    };

    const handleDeleteChange = (userId: number, isDeleted: boolean) => {
        setEditingUser((prev) => {
            if (prev && prev.id === userId) {
                return { ...prev, deleted: isDeleted };
            }
            return prev;
        });
    };

    return (
        <main className="grid grid-cols-1 justify-items-center items-center w-full">
            <div className="container flex w-full flex-col">
                <h2 className="text-2xl text-center font-bold mb-8">Lista de Usuarios</h2>
                <table className="min-w-full bg-white border-b border-gray-200 justify-center items-center">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 text-left text-sm">
                            <th className="px-6 py-3 justify-center items-center font-medium">ID</th>
                            <th className="px-6 py-3 font-medium text-center">Nombre</th>
                            <th className="px-6 py-3 font-medium text-center">Apellido</th>
                            <th className="px-6 py-3 font-medium text-center">Fecha de Nacimiento</th>
                            <th className="px-6 py-3 font-medium text-center">Email</th>
                            <th className="px-6 py-3 font-medium text-center">Teléfono</th>
                            <th className="px-6 py-3 font-medium text-center">Role</th>
                            <th className="px-6 py-3 font-medium text-center">Deleted</th>
                            <th className="px-6 py-3 font-medium text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user: User) => (
                            <UserRow
                                key={user.id}
                                user={user}
                                editingUser={editingUser}
                                handleSaveEdit={handleSaveEdit}
                                handleEditClick={handleEditClick}
                                handleChange={handleChange}
                                handleRoleChange={handleRoleChange}
                                handleDeleteChange={handleDeleteChange}
                                handleCancelEdit={handleCancelEdit}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </main>

    );
}
