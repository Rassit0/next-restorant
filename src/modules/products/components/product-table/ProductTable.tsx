"use client"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React from 'react'

export const ProductTable = () => {
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
                    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(product => (
                        <TableRow key={product}>
                            <TableCell>Imagen</TableCell>
                            <TableCell>Nombe</TableCell>
                            <TableCell>Categoria</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </section>
  )
}
