
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
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  stock: number;
  size: string;
  material: string;
  category: string;
  deleted: boolean;
  count?: number
}

export interface ModalShowPaymentProps {  
  title: string;
  total: number;
  cartItems: CartItem[];
  onConfirm?: (data: any) => void;
  onCancel: () => void;
}

export interface OrderData {
  id: string;
  status: string;
  // Añade otras propiedades según sean necesarias
}


