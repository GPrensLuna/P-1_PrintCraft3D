import { ModalShowPaymentProps } from '@/Ts/ModalWindows';
import Pse from '@/svg/Pse.svg'
import Paypal from '@/svg/Paypal.svg'
import Mercado_Pago from '@/svg/Mercado_Pago.svg'
import Image from 'next/image';

export const ModalShowPayment = ({ title, message, onConfirm, onCancel }: ModalShowPaymentProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <section className="bg-white shadow-[0px_187px_75px_rgba(0,0,0,0.01),0px_105px_63px_rgba(0,0,0,0.05),0px_47px_47px_rgba(0,0,0,0.09),0px_12px_26px_rgba(0,0,0,0.1),0px_0px_0px_rgba(0,0,0,0.1)] rounded-[26px] max-w-[450px] p-5">
        <button onClick={onCancel} className="text-black">X</button>

        <div className="grid grid-cols-3 gap-5">
          <button className="h-14 bg-gray-200 rounded-[11px] px-2 hover:bg-sky-300 border-cyan-800 hover:border">
            <Image src={Paypal} alt="PayPal" />
          </button>
          <button className="h-14 bg-gray-200 rounded-[11px] px-2 hover:bg-sky-300 border-cyan-800 hover:border">
            <Image src={Mercado_Pago} alt="Mercado_Pago" />
          </button>
          <button className="h-14 bg-gray-200 rounded-[11px] px-2 hover:bg-sky-300 border-cyan-800 hover:border">
            <Image src={Pse} alt="Pse" style={{ width: '90%', height: '90%' }} />

          </button>

        </div>

        <div className="flex items-center my-5">
          <hr className="flex-1 bg-gray-200 h-[1px] border-0" />
          <p className="mx-2 text-sm font-semibold text-gray-500">
            O pagar con tarjeta de crédito / debito
          </p>
          <hr className="flex-1 bg-gray-200 h-[1px] border-0" />
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="cardHolderName" className="text-xs text-gray-500 font-semibold">Nombre del titular de la Tarejeta</label>
            <input id="cardHolderName" className="h-10 px-4 rounded-[9px] bg-gray-200 border border-transparent focus:outline-none focus:ring-2 focus:ring-black" type="text" placeholder="Enter your full name" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="cardNumber" className="text-xs text-gray-500 font-semibold">Numero de la Tarejeta</label>
            <input id="cardNumber" className="h-10 px-4 rounded-[9px] bg-gray-200 border border-transparent focus:outline-none focus:ring-2 focus:ring-black" type="number" placeholder="0000 0000 0000 0000" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <input className="col-span-2 h-10 px-4 rounded-[9px] bg-gray-200 border border-transparent focus:outline-none focus:ring-2 focus:ring-black" type="text" placeholder="01/23" />
            <input className="h-10 px-4 rounded-[9px] bg-gray-200 border border-transparent focus:outline-none focus:ring-2 focus:ring-black" type="number" placeholder="CVV" />
          </div>
          <button type="submit" className="mt-4 h-14 bg-gradient-to-b from-gray-700 to-black rounded-[11px] text-white text-sm font-bold shadow-[0px_0px_0px_0px_#FFFFFF,0px_0px_0px_0px_#000000] hover:shadow-[0px_0px_0px_2px_#FFFFFF,0px_0px_0px_4px_rgba(0,0,0,0.23)] transition-all duration-300">Confirmar</button>
        </form>
      </section>
    </div>
  );
};
