import { ModalShowPaymentProps } from '@/Ts/ModalWindows';
import Pse from '@/svg/Pse.svg'
import Paypal from '@/svg/Paypal.svg'
import Mercado_Pago from '@/svg/Mercado_Pago.svg'
import Image from 'next/image';

export const ModalShowPayment = ({ title, message, onConfirm, onCancel }: ModalShowPaymentProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <section className="bg-white shadow-[0px_187px_75px_rgba(0,0,0,0.01),0px_105px_63px_rgba(0,0,0,0.05),0px_47px_47px_rgba(0,0,0,0.09),0px_12px_26px_rgba(0,0,0,0.1),0px_0px_0px_rgba(0,0,0,0.1)] rounded-[26px] max-w-[450px] p-5 ">
        <button onClick={onCancel} className="text-black hover:cursor-pointer hover:border-double">X</button>

        <div className="grid grid-cols-1 gap-5 justify-center items-center ">
          <button className="h-28 bg-gray-200 rounded-[11px] px-2 hover:bg-sky-300 border-cyan-800 hover:border">
            <Image src={Paypal} alt="PayPal" />
          </button>


        </div>
      </section>
    </div>
  );
};
