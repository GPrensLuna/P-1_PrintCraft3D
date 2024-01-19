import { EditableFieldProps } from '@/Ts/Product'


export const EditableField: React.FC<EditableFieldProps> = ({ editing, value, name, handleChange, type = "text" }) => (
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

