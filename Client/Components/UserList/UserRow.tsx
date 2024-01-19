"use client"
import { useState } from "react";
import { Dropdown, ModalAlert } from "@/Components";
import { UserRowProps, EditableFieldProps } from "@/Ts/UserList";


const EditableField: React.FC<EditableFieldProps> = ({ editing, value, name, handleChange, type = "text" }) => (
    editing ? (
        <input
            type={type}
            value={value}
            name={name}
            onChange={handleChange}
            className="border px-2 py-1 rounded shadow-sm transition duration-300 min-w-[150px]"
        />
    ) : (
        <span>{value}</span>
    )
);

const roleOptions = [
    { value: "Admin", label: "Admin" },
    { value: "Client", label: "Client" },
];

const deleteOptions = [
    { value: "Sí", label: "Sí" },
    { value: "No", label: "No" },
];

export const UserRow = ({ user, editingUser, handleSaveEdit, handleEditClick, handleChange, handleRoleChange, handleDeleteChange, handleCancelEdit }: UserRowProps) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const isEditing = editingUser?.id === user.id;

    const handleSaveClick = () => {
        setShowConfirmation(true);
    };

    const handleConfirm = () => {
        setShowConfirmation(false);
        handleSaveEdit(user.id);
    };

    const handleCancel = () => {
        handleCancelEdit()
        setShowConfirmation(false);
    };



    return (
        <>
            <tr className="border-b hover:bg-gray-50" key={user.id}>
                <td className="px-4 py-2 w-20">{user.id}</td>
                <td className="px-2 py-2 min-w-[100px] text-center">
                    <EditableField editing={isEditing} value={editingUser?.firstName || user.firstName} name="firstName" handleChange={handleChange} />
                </td>
                <td className="px-2 py-2 min-w-[100px] text-center">
                    <EditableField editing={isEditing} value={editingUser?.lastName || user.lastName} name="lastName" handleChange={handleChange} />
                </td>
                <td className="px-2 py-2 min-w-[100px] text-center">
                    <EditableField editing={isEditing} value={editingUser?.birthDate || user.birthDate} name="birthDate" handleChange={handleChange} type="date" />
                </td>
                <td className="px-2 py-2 min-w-[100px] text-center">
                    <EditableField editing={isEditing} value={editingUser?.email || user.email} name="email" handleChange={handleChange} />
                </td>
                <td className="px-2 py-2 min-w-[100px] text-center">
                    <EditableField editing={isEditing} value={editingUser?.phoneNumber || user.phoneNumber} name="phoneNumber" handleChange={handleChange} />
                </td>
                <td className="px-2 py-2 min-w-[100px] text-center justify-center items-center justify-items-center">
                    {isEditing ? (
                        <Dropdown
                            options={roleOptions}
                            value={editingUser.roll || ""}
                            onChange={(newRole) => handleRoleChange(user.id, newRole)}
                        />
                    ) : (
                        user.roll
                    )}
                </td>
                <td className="px-4 py-2 min-w-[100px] justify-center items-center justify-items-center text-center">
                    {isEditing ? (
                        <Dropdown
                            options={deleteOptions}
                            value={editingUser.deleted ? "Sí" : "No"}
                            onChange={(newDelete) => handleDeleteChange(user.id, newDelete === "Sí")}
                        />
                    ) : (
                        user.deleted ? "Sí" : "No"
                    )}
                </td>
                <td className="px-4 py-2 w-32">
                    <button
                        onClick={() => isEditing ? handleSaveClick() : handleEditClick(user)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        {isEditing ? 'Guardar' : 'Editar'}
                    </button>
                </td>
            </tr>
            {
                showConfirmation && (
                    <ModalAlert
                        title="Confirmación"
                        message="¿Estás seguro de que quieres guardar los cambios?"
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                    />
                )
            }
        </>
    );
};
