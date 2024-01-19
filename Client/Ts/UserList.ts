
export interface User {
    id: number;
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    phoneNumber?: string;
    email?: string;
    roll?: string;
    deleted?: boolean;
}

export type UserRowProps = {
    user: User;
    editingUser: User | null;
    handleCancelEdit:()=> void;
    handleSaveEdit: (userId: number) => void;
    handleEditClick: (user: User) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleRoleChange: (userId: number, newRole: string) => void;
    handleDeleteChange: (userId: number, isDeleted: boolean) => void;
};

export interface EditableFieldProps {
    editing: boolean;
    value: string | undefined;
    name: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}
