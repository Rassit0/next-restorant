"use client"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React from 'react'

export const CategoryTable = () => {
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
                        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(category => (
                            <TableRow key={category}>
                                <TableCell>Imagen</TableCell>
                                <TableCell>Codigo</TableCell>
                                <TableCell>Nombre</TableCell>
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
