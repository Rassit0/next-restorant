import { Button, Card } from '@nextui-org/react'
import { Product } from '@prisma/client'
import { ShoppingCart01Icon } from 'hugeicons-react'
import Image from 'next/image'
import React from 'react'

interface Props {
    product: Product
}

export const ProductCard = ({ product }: Props) => {
    return (
        <Card
            // isPressable
            shadow='md'
            className='md:max-w-[275px] border-none rounded-xl h-full'
            fullWidth
        >
            <div className='text-center grid md:grid-cols-2 gap-4 p-4 h-full'>
                {/* IMAGEN */}
                <div className='rounded-md md: max-h-[200px] h-full object-cover md: max-w-[200px] w-full overflow-hidden'>
                    <Image
                        src={product.image}
                        alt={product.name}
                        className='w-full object-contain object-center h-full'
                        height={200}
                        width={200}
                    />
                </div>
                {/* DETALLES */}
                <div className='text-start flex flex-col justify-between'>
                    <div className='space-y-2 text-gray-600 mb-2'>
                        <h3 className='text-xl font-bold text-black'>{product.name}</h3>

                        <p className='line-clamp-2'>{product.description}</p>

                        <p>
                            <span className='font-bold text-black'>stock:</span> {product.stock}
                        </p>
                        <p>
                            <span className='font-bold text-black'>Precio:</span> {product.price}
                        </p>
                    </div>

                    {/* BUTTON */}
                    <Button
                        color='primary'
                        startContent={<ShoppingCart01Icon/>}
                    />
                </div>
            </div>
        </Card>
    )
}
