import { ModalwarningProps } from '@/Ts/ModalWindows';

export const ModalAlertSignIn = ({ isOpen, message, onClose }: ModalwarningProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-5 md:p-20 mx-2 md:mx-0">
        <h2 className="text-lg font-semibold text-gray-700 text-center">{message}</h2>
        <button
          className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

