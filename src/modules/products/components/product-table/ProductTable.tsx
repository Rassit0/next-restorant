"use client"
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React from 'react'
import { DeleteProductModal, IProduct } from '@/modules/products';
import Image from 'next/image';
import { ViewIcon } from 'hugeicons-react';
import { useRouter } from 'next/navigation';

interface Props {
    products: IProduct[];
}

export const ProductTable = ({ products }: Props) => {

    const router = useRouter();

    return (
        <section className='container pt-8'>
            <Table aria-label='Products management table'>
                <TableHeader>
                    <TableColumn>IMAGEN</TableColumn>
                    <TableColumn>NOMBRE</TableColumn>
                    <TableColumn>CATEGORIA</TableColumn>
                    <TableColumn>STOCK</TableColumn>
                    <TableColumn>PRECIO</TableColumn>
                    <TableColumn>FECHA DE CREACION</TableColumn>
                    <TableColumn>ACCIONES</TableColumn>
                </TableHeader>

                <TableBody>
                    {
                        products.map(product => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <Image
                                        alt={product.name}
                                        src={product.image}
                                        width={70}
                                        height={70}
                                    />
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.category?.name}</TableCell>
                                <TableCell>{product.stock} u.</TableCell>
                                <TableCell>{product.price} $</TableCell>
                                <TableCell>{product.createdAt.toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Button onPress={() => { router.push(`/admin/products/${product.slug}`) }} color='primary' variant='light' isIconOnly startContent={<ViewIcon />} />
                                    <DeleteProductModal productId={product.id} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </section>
    )
}
