
export interface ModalwarningProps {
    isOpen:boolean,
    onClose:()=>void,
    message:string,
}


export interface ModalDetailProductProps {
    isOpen: boolean;
    onClose: () => void;
    productId: number;
}

export interface ModalAlertProps {
    title:string,
    message:string,
    onCancel:()=>void,
    onConfirm:()=>void,
}
export interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

export interface ModalShowPaymentProps {
  title: string;
  total: number;
  cartItems: CartItem[];
  onConfirm: () => void;
  onCancel: () => void;
}

