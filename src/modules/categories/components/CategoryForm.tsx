"use client"
import { Button, Input } from '@nextui-org/react'
import React, { FormEvent, useState } from 'react'
import { toast } from 'sonner'

export const CategoryForm = () => {

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);
        const { categoryName, image } = e.target as HTMLFormElement;

        if (categoryName.value.trim() === '') {
            toast.warning("Ocurrio un error", {
                description: "Todos los campos son obligatorios"
            })
            setIsLoading(false);
            return;
        }

        // EJECUTAR SERVER ACTIONS
        
        setIsLoading(false);
    }

    return (
        <form onSubmit={handleSubmit} className='bg-white px-6 pt-8 pb-12 border border-gray-300 rounded space-y-6'>
            <h2 className='text-2xl font-semibold'>Formulario</h2>

            <Input
                name='categoryName'
                label='Nombre'
                placeholder='Agrega un nombre a la categoría'
                variant='underlined'
            />

            <input type='file' name='image' />

            <Button
                type='submit'
                color='primary'
                className='block'
                isLoading={isLoading}
                isDisabled={isLoading}
            >
                Guardar Categoría
            </Button>

        </form>
    )
}
