/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client"
import { Product } from "@/Ts/Product";
import * as Components from '@/Components'
import { useState, useEffect } from 'react';

export const Card = ({ id, name, image, description, price, size, material, category, handleAddToCart: addToCart }: Product) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addProduts, setAddProduts] = useState(0);
  const [error, setError] = useState('');


  const handleAddToCartClick = () => {
    const cartData = JSON.parse(localStorage.getItem("cart") ?? '[]');

    const productIndex = cartData.findIndex((item: { id: number }) => item.id === id);

    if (productIndex !== -1) {
      cartData[productIndex].count += 1;
    } else {
      const newProduct = { id, name, image, description, price, size, material, category, count: 1 };
      cartData.push(newProduct);
    }

    localStorage.setItem("cart", JSON.stringify(cartData));
    setAddProduts(prev => prev + 1);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleRemoveFromCartClick = () => {
    const cartData = JSON.parse(localStorage.getItem("cart") ?? '[]');

    const productIndex = cartData.findIndex((item: { id: number }) => item.id === id);

    if (productIndex !== -1) {
      if (cartData[productIndex].count > 1) {
        cartData[productIndex].count -= 1;
      } else {
        cartData.splice(productIndex, 1);
      }
      setAddProduts(prev => prev - 1);
    }

    localStorage.setItem("cart", JSON.stringify(cartData));
  };


  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart") ?? '[]');

    const productInCart = cartData.find((item: { id: number }) => item.id === id);

    if (productInCart) {
      setAddProduts(productInCart.count);
    } else {
      setAddProduts(0);
    }

  }, [addProduts, id]);


  function handleDetailProduct(e: React.MouseEvent<HTMLImageElement>) {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setError('');
  };

  return (
    <article className="flex pt-20  min-h-[400px] cursor-pointer justify-center items-center ">

      <article className="m-[120px 5px 10px 50px] w-80 bg-white rounded-[10px] cursor-pointer p-4 flex flex-col justify-between min-h-[285px] p-[90px 20px 15px] relative shadow-[0_0_30px_rgba(0,0,0,0.2)]">
        <img
          className="rounded-[8px] h-[160px] absolute left-[20px] top-[-80px] w-[130px]"
          alt={name}
          src={image}
          onClick={handleDetailProduct}
        />
        <div className="absolute right-5 top-5 text-[#8e939b] text-[14px] leading-[16px] mt-[0.5rem] mr-[1rem]">
          <strong>size: {size}</strong>
        </div>
        <h2 className="text-[#4483d0] text-[18px] pt-24 text-aling leading-[22px] mb-[0.3rem] text-left">
          <strong>{name}</strong>
        </h2>
        <p className="text-[#6d737d] text-[18px] px-2 leading-[16px] mt-[0.5rem] mb-[1rem] text-left">
          {description}
        </p>
        <div className="inline-block ml-auto">
          <span className="text-lg font-bold text-green-600">
            <strong>{formatCurrency(price)}</strong>
          </span>
        </div>
        <footer className="mt-[15px] text-right">
          <div className="flex items-center">
            <div className="ml-auto"></div>
            <div className="absolute left-5 bottom-10 text-[#8e939b] text-[14px] leading-[16px] mb-[1rem] ml-[1rem]">
              <strong>▓ {material}</strong>
            </div>
            <button
              onClick={handleAddToCartClick}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50">
              Añadir al Carrito {addProduts > 0 ? "+" : ""}
              {addProduts > 0 ? (<strong className="flex justify-center items-center absolute bottom-10 right-10 bg-blue-500 text-white font-bold text-sm h-8 w-8 rounded-full shadow-md hover:bg-blue-600">
                {addProduts}
              </strong>

              ) : ""}


            </button>

            {addProduts > 0 && (
              <button
                onClick={handleRemoveFromCartClick}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50">
                -
              </button>
            )}

            {error && <div className="tu-clase-para-mostrar-errores">{error}</div>}

          </div>
        </footer>
      </article>
      <Components.ModalDetailProduct
        isOpen={isModalOpen}
        onClose={closeModal}
        productId={id}
      >
      </Components.ModalDetailProduct>

    </article>

  );
}

