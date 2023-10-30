const DeleteProductComponent = async (idProduct) => {
  const response = await fetch(
    `URL_DEL_SERVIDOR/api/deleteProduct/${idProduct}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }

  return response.json();
};

export default DeleteProductComponent;
