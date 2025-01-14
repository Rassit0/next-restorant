"use client"
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import { Category } from '@prisma/client';
import { PencilEdit01Icon } from 'hugeicons-react';
import React, { FormEvent, useState } from 'react'
import { updateCategory } from '../actions/update-category';
import { toast } from 'sonner';

interface Props {
    category: Category;
}

export const UpdateCategoryModal = ({ category }: Props) => {

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        const { categoryName, image } = e.target as HTMLFormElement;

        const formData = new FormData();

        if (image.files && image.files[0]) {
            // Si hay un archivo seleccionado, lo agregamos
            formData.append('image', image.files[0]);
        }

        formData.append('id', category.id)
        formData.append('name', categoryName.value)

        const { error, message } = await updateCategory(formData);
        if (error) {
            toast.warning("Ocurrió un error", {
                description: message
            })

            setIsLoading(false);
            return;
        }

        // Si se guarda con exito
        toast.success(message);
        onClose();
        setIsLoading(false);
    }
    return (
        <>
            <Button
                onPress={onOpen}
                isIconOnly
                color='primary'
                variant='light'
                startContent={<PencilEdit01Icon />}
            />

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={handleSubmit}>
                            <ModalHeader>Editar Categoría</ModalHeader>
                            <ModalBody>
                                <Input
                                    name='categoryName'
                                    placeholder='Actualizar el nombre'
                                    variant='underlined'
                                    defaultValue={category.name}
                                />

                                <input type='file' name='image' />
                            </ModalBody>

                            <ModalFooter>
                                <Button color='danger' variant='light' onPress={onClose}>Cancelar</Button>

                                <Button
                                    color='primary'
                                    type='submit'
                                    isLoading={isLoading}
                                    isDisabled={isLoading}
                                >
                                    Actualizar
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
