"use server"

import { prisma } from "@/lib/prisma";
import { v2 as claudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import bcrypt from 'bcryptjs';

export const updateUser = async (formData: FormData) => {
    const userId = formData.get('id') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const image = formData.get('image') as File | null;

    // Validaciones básicas
    if (!name || !email) {
        return {
            error: true,
            message: "Nombre y correo electrónico son requeridos"
        };
    }

    if (password && password !== confirmPassword) {
        return {
            error: true,
            message: "Las contraseñas no coinciden"
        };
    }

    if (password && password.length < 6) {
        return {
            error: true,
            message: "La contraseña debe tener al menos 6 caracteres"
        };
    }

    try {
        // Verificar si el usuario existe
        const existingUser = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!existingUser) {
            return {
                error: true,
                message: "Usuario no encontrado"
            };
        }

        // Verificar si el correo ya está en uso por otro usuario
        if (email !== existingUser.email) {
            const emailExists = await prisma.user.findFirst({
                where: {
                    email,
                    NOT: { id: userId }
                }
            });

            if (emailExists) {
                return {
                    error: true,
                    message: "El correo electrónico ya está en uso"
                };
            }
        }

        // Preparar datos para actualizar
        const updateData: {
            name: string;
            email: string;
            password?: string;
            image?: string;
        } = {
            name,
            email,
        };

        // Actualizar contraseña si se proporcionó
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        // Subir y actualizar imagen si se proporcionó
        if (image && image.size > 0 && image.type.startsWith("image/")) {
            try {
                const imageUrl = await uploadImage(image);
                updateData.image = imageUrl;
            } catch (error) {
                console.error('Error al subir la imagen:', error);
                return {
                    error: true,
                    message: "Error al subir la imagen. Por favor, intente nuevamente."
                };
            }
        }

        // Actualizar el usuario en la base de datos
        await prisma.user.update({
            where: { id: userId },
            data: updateData
        });

        revalidatePath('/admin/users');

        return {
            error: null,
            message: "Usuario actualizado correctamente"
        };
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        return {
            error: true,
            message: "Error al actualizar el usuario. Por favor, intente nuevamente."
        };
    }
};

const uploadImage = async (image: File): Promise<string> => {
    try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');
        const mimeType = image.type || 'image/jpeg';

        const result = await claudinary.uploader.upload(
            `data:${mimeType};base64,${base64Image}`,
            { folder: 'restaurant/users' }
        );
        
        return result.secure_url;
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        throw new Error('Error al procesar la imagen');
    }
};