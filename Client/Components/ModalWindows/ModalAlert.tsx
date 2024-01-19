import { ModalAlertProps } from '@/Ts/ModalWindows';

export const ModalAlert = ({ title, message, onConfirm, onCancel }: ModalAlertProps) => {


  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-md p-4 max-w-md">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-600 mt-2">{message}</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onCancel}
            className="text-sm border border-gray-300 py-2 px-4 rounded-md hover:bg-red-400 mr-4"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="text-sm bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
