"use client"
import { CircularProgress } from '@nextui-org/react';
import React from 'react'
import useSWR from 'swr';
import { IOrderWithDetails } from '../interfaces/orders-with-details';
import { OrderCard } from './OrderCard';

export const OrderList = () => {
    const url = "/api/orders";
    const fetcher = () => fetch(url)
        .then(res => res.json())
        .then(data => data);

    const { data, error, isLoading } = useSWR<IOrderWithDetails[]>(url, fetcher, {
        refreshInterval: 500,// en 500 milisegundos hara la peticion
        revalidateOnFocus: false, // Esto para que no realice la peticion si no se esta en la pantalla
    });

    if (isLoading) {
        return (
            <section className="min-h[80vh] flex flex-col justify-center items-center">
                <CircularProgress aria-label="progress indicador" color="primary" size="lg" />
            </section>
        )
    }

    if (error) {
        console.log(error)
        return (
            <section className="min-h[80vh] flex flex-col justify-center items-center">
                <p>Ocurrio un error</p>
            </section>
        )
    }

    // COnvertir las fechas a objeros Date
    const orders = data!.map((order: IOrderWithDetails) => ({
        ...order,
        status: Boolean(order.status),
        createdAt: new Date(order.createdAt),
        updatedAt: new Date(order.updatedAt)
    }));

    console.log(orders)

    return (
        <section className='pt-8 container'>
            <ul className='grid md:grid-cols-2 xl:grid-cols-3 gap-4'>
                {
                    orders?.map(order => (
                        <li key={order.id}>
                            <OrderCard
                                order={order}
                            />
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}
