/* eslint-disable @next/next/no-img-element */
import { Product } from "@/Ts/Product";

interface ProductsRowProps {
    product: Product;
    openModal: (productId: number) => void;
}

export const ProductsRow: React.FC<ProductsRowProps> = ({
    product,
    openModal
}) => {
    const cellClasses = "px-4 py-2 min-w-[100px] max-w-[350px] text-left align-middle text-center";
    const headerCellClasses = "font-semibold text-gray-700";

    return (
        <tr className={`border-b hover:bg-gray-50 transition duration-200 ease-in-out`}>
            <td className={`${cellClasses} ${headerCellClasses}`}>{product.id}</td>
            <td className={cellClasses}>
                <img src={product.image} alt={`${product.name} image`} className="w-20 h-20 object-cover" />
            </td>
            <td className={cellClasses}>{product.name}</td>
            <td className={cellClasses}>{product.description}</td>
            <td className={cellClasses}>{product.price}</td>
            <td className={cellClasses}>{product.stock}</td>
            <td className={cellClasses}>{product.size}</td>
            <td className={cellClasses}>{product.material}</td>
            <td className={cellClasses}>{product.category}</td>
            <td className={cellClasses}>
                <span className={product.deleted ? "text-red-500" : "text-green-500"}>
                    {product.deleted ? "Sí" : "No"}
                </span>
            </td>
            <td className="px-4 py-2">
                <button
                    onClick={() => openModal(product.id)}
                    className={`transition duration-300 ease-in-out font-bold py-2 px-4 rounded text-white bg-blue-500 hover:bg-blue-600`}
                >
                    Editar
                </button>
            </td>
        </tr>
    );
};
