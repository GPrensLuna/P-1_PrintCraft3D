
interface DropdownProps {
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange }) => {
    return (
        <select value={value} onChange={(e) => onChange(e.target.value)} className="px-2 py-1 border rounded">
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    );
};

