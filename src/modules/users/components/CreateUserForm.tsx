"use client";
import { Button, Input, Card, CardBody, CardHeader } from "@nextui-org/react";
import React, { FormEvent, useState, ChangeEvent } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createUser } from "../actions/create-user";
import Image from "next/image";

export const CreateUserForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
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

    // Validar que las contraseñas coincidan
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      toast.warning("Las contraseñas no coinciden");
      setIsLoading(false);
      return;
    }

    try {
      const { error, message } = await createUser(formData);

      if (error) {
        toast.warning("Error al crear el usuario", { description: message });
        return;
      }

      toast.success("Usuario creado exitosamente");
      router.push("/admin/users");
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Error al crear el usuario");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-semibold">Nuevo Usuario</h2>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="relative">
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
                className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              isRequired
              name="name"
              label="Nombre completo"
              placeholder="Nombre del usuario"
              variant="bordered"
            />
            <Input
              isRequired
              name="email"
              type="email"
              label="Correo electrónico"
              placeholder="usuario@ejemplo.com"
              variant="bordered"
            />
            <Input
              isRequired
              name="password"
              type="password"
              label="Contraseña"
              placeholder="••••••••"
              variant="bordered"
              minLength={6}
            />
            <Input
              isRequired
              name="confirmPassword"
              type="password"
              label="Confirmar contraseña"
              placeholder="••••••••"
              variant="bordered"
              minLength={6}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="flat"
              onPress={() => router.back()}
              isDisabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              color="primary"
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Crear Usuario
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
