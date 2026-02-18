"use client"
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { Delete01Icon } from 'hugeicons-react'
import React, { useState } from 'react'
import { deleteUser } from '../../actions/delete-user';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Props {
    userId: string;
    userName?: string;
}

export const DeleteUserModal = ({ userId, userName = 'este usuario' }: Props) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            const { error, message } = await deleteUser(userId);

            if (error) {
                toast.error("Error al eliminar usuario", {
                    description: message
                });
                return;
            }

            toast.success(message);
            router.refresh(); // Refresh the page to update the users list
        } catch (error) {
            toast.error("Error inesperado", {
                description: "Ocurrió un error al intentar eliminar el usuario"
            });
            console.error(error);
        } finally {
            setIsLoading(false);
            onClose();
        }
    }

    return (
        <>
            <Button
                onPress={onOpen}
                isIconOnly
                color='danger'
                variant='light'
                startContent={<Delete01Icon />}
                aria-label="Eliminar usuario"
            />

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Eliminar Usuario</ModalHeader>
                            <ModalBody>
                                <p>¿Está seguro de eliminar el usuario <strong>{userName}</strong>? Esta acción no se puede deshacer.</p>
                            </ModalBody>

                            <ModalFooter>
                                <Button color='default' variant='light' onPress={onClose} isDisabled={isLoading}>
                                    Cancelar
                                </Button>

                                <Button
                                    color='danger'
                                    isLoading={isLoading}
                                    isDisabled={isLoading}
                                    onPress={handleSubmit}
                                >
                                    {isLoading ? 'Eliminando...' : 'Eliminar'}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}