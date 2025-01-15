import React from 'react'
import { IProductDetails } from '@/modules/products'
import Image from 'next/image';

interface Props {
    product: IProductDetails;
}

export const ProductDetails = ({ product }: Props) => {

    const { category, createdAt, description, image, name, price, stock, updatedAt } = product;

    return (
        <section className='container pt-8 grid md:grid-cols-5'>

            <Image
                className='col-span-2'
                alt={name}
                src={image}
                width={400}
                height={400}
            />

            <div className='col-span-3'>
                <div className='flex flex-col md:flex-row justify-between items-start mb-4'>
                    <div>
                        <h2 className='text-2xl font-semibold'>{name}</h2>
                        <p>Stock disponible: {stock}u.</p>
                    </div>

                    <p className='text-xl text-primary font-bold'>Precio: {price}$</p>

                </div>

                <p>Categoría: {category?.name}</p>

                <h3 className='text-xl font-semibold mt-4'>Descripción del producto</h3>
                <p>{description}</p>

                <h3 className='text-xl font-semibold mt-4'>Detalles de mantenimiento</h3>
                <p>Fecha de creación: {createdAt.toLocaleDateString("es-ES",{weekday:'long', year:'numeric', month:'long', day:'numeric'})}</p>
                <p>Fecha de actualización: {updatedAt.toLocaleDateString("es-ES",{weekday:'long', year:'numeric', month:'long', day:'numeric'})}</p>
            </div>
        </section>
    )
}
