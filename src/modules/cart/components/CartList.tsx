"use client"
import React from 'react'
import { useCartStore } from '../store/cart.store'
import Image from 'next/image';
import { Button } from '@nextui-org/react';
import { Add01Icon, MinusSignIcon } from 'hugeicons-react';

export const CartList = () => {

    const { cart, incrementQuantity, decrementQuantity } = useCartStore();

    return (
        <ul className='flex flex-col gap-6 w-full h-full max-h-min overflow-y-auto'>
            {
                cart.map((item) => (
                    <li className='flex justify-between items-center gap-2' key={item.product.id}>
                        {/* IMAGEN */}
                        <div className="relative h-[70px] w-[80px] rounded-lg overflow-hidden">
                            <Image
                                fill
                                src={item.product.image}
                                alt={item.product.name}
                                className='object-cover object-center'
                            />
                        </div>
                        {/* DETALLES */}
                        <div className="w-full">
                            <h5 className='font-semibold'>{item.product.name}</h5>
                            <p className='textsm'>Precio: {item.product.price}</p>

                            {/* BOTONES DE CANTIDAD */}
                            <div className='w-full mt-3 flex items-center justify-between'>

                                <Button
                                    isIconOnly
                                    radius='full'
                                    variant='bordered'
                                    size='sm'
                                    startContent={<MinusSignIcon size={12} />}
                                    onPress={() => decrementQuantity(item.product.id)}
                                />

                                <span>{item.quantity}</span>

                                <Button
                                    isIconOnly
                                    radius='full'
                                    variant='bordered'
                                    size='sm'
                                    startContent={<Add01Icon size={12} />}
                                    onPress={() => incrementQuantity(item.product.id)}
                                />


                            </div>

                        </div>
                    </li>
                ))
            }
        </ul>
    )
}
