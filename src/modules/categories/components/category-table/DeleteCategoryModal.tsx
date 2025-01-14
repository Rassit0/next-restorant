"use client"
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { Delete01Icon } from 'hugeicons-react'
import React, { useState } from 'react'
import { deleteCategory } from '../../actions/delete-category';
import { toast } from 'sonner';

interface Props {
    categoryId: string;
}

export const DeleteCategoryModal = ({ categoryId }: Props) => {

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);

        // SERVER ACTION
        const {error, message} = await deleteCategory(categoryId);

        if(error){
            toast.error("Ocurrio un error", {
                description: message
            });
            return;
        }

        toast.success(message);

        onClose();
    }

    return (
        <>
            <Button
                onPress={onOpen}
                isIconOnly
                color='danger'
                variant='light'
                startContent={<Delete01Icon />}
            />

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Eliminar Categoría</ModalHeader>
                            <ModalBody>
                                <p>¿Está seguro de eliminar la categoría</p>
                            </ModalBody>

                            <ModalFooter>
                                <Button color='danger' variant='light' onPress={onClose}>Cancelar</Button>

                                <Button
                                    color='primary'
                                    isLoading={isLoading}
                                    isDisabled={isLoading}
                                    onPress={handleSubmit}
                                >
                                    Eliminar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
