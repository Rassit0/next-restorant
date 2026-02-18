"use client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { User } from "@prisma/client";
import { PencilEdit01Icon } from "hugeicons-react";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";
import { updateUser } from "@/modules/users";
import Image from "next/image";

export const UpdateUserModal = ({ user }: { user: User }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(user.image);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Agregar el ID del usuario
    formData.append("id", user.id);

    // Solo agregar la imagen si se seleccionó una nueva
    const imageInput = form.image as HTMLInputElement;
    if (imageInput.files && imageInput.files[0]) {
      formData.append("image", imageInput.files[0]);
    }

    try {
      const { error, message } = await updateUser(formData);
      if (error) {
        toast.warning("Error al actualizar", { description: message });
        return;
      }

      toast.success("Usuario actualizado correctamente");
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error al actualizar el usuario");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        color="primary"
        variant="light"
        startContent={<PencilEdit01Icon />}
        aria-label="Editar usuario"
      />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit}>
              <ModalHeader>Editar Usuario</ModalHeader>
              <ModalBody className="space-y-4">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {previewImage ? (
                      <Image
                        src={previewImage}
                        alt="Vista previa de la imagen"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                        unoptimized={!previewImage.startsWith("/")} // Optimize only local images
                      />
                    ) : (
                      <span className="text-gray-500">Sin imagen</span>
                    )}
                  </div>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="text-sm text-gray-500"
                  />
                </div>

                <Input
                  isRequired
                  name="name"
                  label="Nombre completo"
                  variant="bordered"
                  defaultValue={user.name || ""}
                />

                <Input
                  isRequired
                  name="email"
                  type="email"
                  label="Correo electrónico"
                  variant="bordered"
                  defaultValue={user.email || ""}
                />

                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    Dejar en blanco si no deseas cambiar la contraseña
                  </p>
                  <Input
                    name="password"
                    type="password"
                    label="Nueva contraseña"
                    variant="bordered"
                  />
                  <Input
                    name="confirmPassword"
                    type="password"
                    label="Confirmar nueva contraseña"
                    variant="bordered"
                  />
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                >
                  Guardar cambios
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
