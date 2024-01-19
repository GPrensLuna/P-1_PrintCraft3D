"use client";
import { useState, ChangeEvent, useMemo } from 'react';
import { useGetProductsQuery } from '@/redux/services/ProductsApi';
import * as Components from "@/Components";
import { Product, ProductsApiResponse } from '@/Ts/Product';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorr, setErrorr] = useState('');

    const searchValue = useSelector((state: RootState) => state.search.value);

    const { data } = useGetProductsQuery({
        page: currentPage,
        limit: limit,
        selectedMaterials: selectedMaterial,
        selectedSize: selectedSize,
        search: searchValue,
    });

    const products = useMemo(() => {
        if (isProductsApiResponse(data)) {
            return data.results;
        }
        return [];
    }, [data]);


    function isProductsApiResponse(obj: any): obj is ProductsApiResponse {
        return obj && Array.isArray(obj.results) && typeof obj.count === 'number';
    }

    const count = isProductsApiResponse(data) ? data.count : 0;
    const totalPages = Math.ceil(count / limit);

    const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setLimit(parseInt(e.target.value, 10));
        setCurrentPage(1);
    };

    const handleMaterialChange = (material: string) => {
        setSelectedMaterial(material);
        setCurrentPage(1);
    };

    const handleSizeChange = (size: string) => {
        setSelectedSize(size);
        setCurrentPage(1);
    };

    const loadPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setErrorr('');
    };

    const handleAddToCart = (product: Product) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    return (
        <main
            className="grid-Home" >


            <div className='pt-1 pb-8 px-5'>
                <Components.Aside
                    count={count}
                    onMaterialChange={handleMaterialChange}
                    onSizeChange={handleSizeChange}
                />
            </div>

            <div className='px-5'>
                <Components.Paginated
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handleLimitChange={handleLimitChange}
                    loadPage={loadPage}
                    limit={limit}
                />
                <section className="grid-products w-full">
                    {products && products.map((product: Product) => (
                        <Components.Card
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            image={product.image}
                            description={product.description}
                            size={product.size}
                            price={product.price}
                            material={product.material}
                            category={product.category}
                            stock={0}
                            deleted={false}
                            averageScore={0}
                            countReviews={0}
                            Reviews={[]}
                            handleAddToCart={() => handleAddToCart(product)}
                        />
                    ))}
                </section>
            </div>
            <Components.Modalwarning isOpen={isModalOpen} onClose={closeModal} message={errorr} />
        </main>
    );
}