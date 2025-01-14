"use client"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { Category } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import { DeleteCategoryModal, UpdateCategoryModal } from '@/modules/categories'

interface Props {
    categories: Category[]
}

export const CategoryTable = ({categories}: Props) => {
    
    return (
        <section className='container pt-8'>
            <Table>
                <TableHeader>
                    <TableColumn>IMAGEN</TableColumn>
                    <TableColumn>CODIGO</TableColumn>
                    <TableColumn>NOMBRE</TableColumn>
                    <TableColumn>FECHA DE CREACION:</TableColumn>
                    <TableColumn>ACCIONES</TableColumn>
                </TableHeader>

                <TableBody>
                    {
                        categories.map(category => (
                            <TableRow key={category.id}>
                                <TableCell>
                                    <Image
                                        alt={category.name}
                                        src={category.image}
                                        width={70}
                                        height={70}
                                    />
                                </TableCell>
                                <TableCell>{category.id}</TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>{category.createdAt.toLocaleString()}</TableCell>
                                <TableCell>
                                    <UpdateCategoryModal category={category}/>
                                    <DeleteCategoryModal categoryId={category.id}/>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </section>
    )
}
