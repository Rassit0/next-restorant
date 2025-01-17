import { Button, Card, Chip, Divider } from '@nextui-org/react'
import React, { useState } from 'react'
import { IOrderWithDetails } from '../interfaces/orders-with-details'
import { completeOrder } from '@/modules/orders'

interface Props {
    order: IOrderWithDetails
}
export const OrderCard = ({ order }: Props) => {

    const [isLoading, setIsLoading] = useState(false);

    const handleOrderStatus = async (id: string) => {
        setIsLoading(true);

        await completeOrder(id);

        setIsLoading(false);
    }

    return (
        <Card
            // isPressable
            shadow='md'
            className='border-none rounded-xl p-6'
            fullWidth
        >
            <div className='text-start flex justify-between items-start'>
                <div >
                    <p className='font-semibold text-xl line-clamp-1'>{order.client}</p>
                    <p>{order.createdAt.toLocaleString()}</p>
                </div>

                <Chip
                    color={order.status ? "success" : "warning"}
                    variant='shadow'
                >
                    {order.status ? "Completado" : "Pendiente"}
                </Chip>
            </div>

            <Divider className='my-3' />
            <div className='grid grid-cols-3 gap-2 w-full text-center font-semibold mb-3'>
                <p>Items</p>
                <p>qty</p>
                <p>Precio</p>
            </div>
            <ul className='space-y-3'>
                {
                    order.details.map(detail => (
                        <li key={detail.productName} className='grid text-start grid-cols-3 items-center gap-2'>
                            <p>{detail.productName}</p>
                            <p className='text-center'>{detail.quantity}u.</p>
                            <p className='text-center'>{detail.subTotal}$</p>
                        </li>
                    ))
                }
            </ul>

            <Divider className='my-3' />

            <div className='w-full font-semibold text-xl flex justify-between'>
                <p>Total:</p>
                <p>${order.total}</p>
            </div>

            {
                !order.status
                && (
                    <Button
                        fullWidth
                        color='primary'
                        onPress={() => handleOrderStatus(order.id)}
                        isLoading={isLoading}
                        isDisabled={isLoading}
                    >
                        Completar Orden
                    </Button>
                )
            }
        </Card>
    )
}
