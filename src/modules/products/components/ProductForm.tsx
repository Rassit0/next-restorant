"use client"
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { Category } from '@prisma/client'
import React, { FormEvent, useState } from 'react'
import { createProduct } from '@/modules/products'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface Props {
    categories: Category[]
}

export const ProductForm = ({ categories }: Props) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const { productName, description, image, price, stock, categoryId } = e.target as HTMLFormElement;

        const formData = new FormData();
        formData.append('name', productName.value);
        formData.append('description', description.value);
        formData.append('price', price.value);
        formData.append('stock', stock.value);
        formData.append('categoryId', categoryId.value);
        formData.append("image", image.files[0]);

        const { error, message } = await createProduct(formData);

        if (error) {
            toast.error("Ocurrio un error", {
                description: message
            })
            setIsLoading(false);
            return;
        }

        toast.success(message);
        router.push('/admin/products')
        setIsLoading(false);


    }

    return (
        <section className='container pt-8'>
            <div className="bg-white px-6 pt-8 pb-12 border border-gray-300 rounded">
                <h2 className="text-2xl font-semibold mb-6">Formulario</h2>

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <Input
                        variant='underlined'
                        label="Nombre"
                        placeholder='Agrega un nombre al producto'
                        name='productName'
                    />

                    <Textarea
                        variant='underlined'
                        name='description'
                        label="Descripción"
                        placeholder='Agrega la descripción del producto'
                    ></Textarea>

                    <Input
                        variant='underlined'
                        label="Precio"
                        placeholder='Agrega un precio'
                        type='number'
                        name='price'
                    />

                    <Input
                        variant='underlined'
                        label="Stock"
                        placeholder='Agrega el stock disponible'
                        type='number'
                        name='stock'

                    />

                    <input type='file' name='image' id='image' />

                    <Select
                        label="Categorías"
                        placeholder='Selecciona una categoría'
                        name='categoryId'
                        variant='underlined'
                    >
                        {
                            categories.map(category => (
                                <SelectItem value={category.id} key={category.id}>
                                    {category.name}
                                </SelectItem>
                            ))
                        }
                    </Select>

                    <Button
                        type='submit'
                        color='primary'
                        isLoading={isLoading}
                        isDisabled={isLoading}
                    >
                        Guardar Producto
                    </Button>
                </form>
            </div>
        </section>
    )
}
