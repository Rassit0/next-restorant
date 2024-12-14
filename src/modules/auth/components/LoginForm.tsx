"use client"
import { Button, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import { toast } from 'sonner'

export const LoginForm = () => {

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const { email, password } = e.target as HTMLFormElement;

        console.log(email.value, password.value);

        if (email.value.trim() === '' || password.value.trim() === '') {
            toast.warning("Ocurrio un error", {
                description: "Todos los campos deben ser llenados",
            })
        }

        // TODO: Agregar login con credneciales

        setIsLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className='login__form'>
            <Input
                type='email'
                name='email'
                label="Correo Electronico"
                variant='underlined'
            />

            <Input
                type='password'
                name='password'
                label="Contraseña"
                variant='underlined'
            />

            <Button
                type='submit'
                color='primary'
                fullWidth
                isLoading={isLoading}
                isDisabled={isLoading}
            >
                Iniciar Sesion
            </Button>
        </form>
    )
}
