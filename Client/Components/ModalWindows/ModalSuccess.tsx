
interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ModalSuccess: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
    return (
        <div className={`${isOpen ? "block" : "hidden"} fixed inset-0 overflow-y-auto`}>
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-opacity-75 bg-gray-500"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-middle bg-white rounded-lg px-8 py-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Producto agregado exitosamente</h2>
                    <button onClick={onClose} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

