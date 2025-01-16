"use client"
import { useCartStore } from '@/modules/cart'
import { Badge, Button } from '@nextui-org/react';
import { ShoppingCart01Icon } from 'hugeicons-react';
import React from 'react'

export const NavCartButton = () => {

    const { cart, handleCartOpen } = useCartStore();

    return (
        <Badge
            content={cart.length == 0 ? null : cart.length}
            color='primary'
            style={{ fontSize: '10px' }}
        >
            <Button
                isIconOnly
                onPress={handleCartOpen}
                radius='full'
                variant='light'
                startContent={<ShoppingCart01Icon />}
            />
        </Badge>
    )
}
