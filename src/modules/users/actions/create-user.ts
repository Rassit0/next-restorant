"use server";

import { prisma } from "@/lib/prisma";
import { v2 as claudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export const createUser = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const image = formData.get("image") as File | null;

  // Validaciones básicas
  if (!name || !email || !password || !confirmPassword) {
    return {
      error: true,
      message: "Todos los campos son requeridos",
    };
  }

  if (password !== confirmPassword) {
    return {
      error: true,
      message: "Las contraseñas no coinciden",
    };
  }

  if (password.length < 6) {
    return {
      error: true,
      message: "La contraseña debe tener al menos 6 caracteres",
    };
  }

  try {
    // Verificar si el usuario ya existe
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return {
        error: true,
        message: "Ya existe un usuario con este correo electrónico",
      };
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData: {
      name: string;
      email: string;
      password: string;
      image?: string;
    } = {
      name,
      email,
      password: hashedPassword,
    };

    // Subir imagen si existe y es válida
    if (image && image.size > 0 && image.type.startsWith("image/")) {
      try {
        const imageUrl = await uploadImage(image);
        userData.image = imageUrl;
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        return {
          error: true,
          message:
            "Error al procesar la imagen. Por favor, intente con otra imagen.",
        };
      }
    }

    // Crear el usuario
    await prisma.user.create({
      data: userData,
    });

    revalidatePath("/admin/users");

    return {
      error: null,
      message: "Usuario creado exitosamente",
    };
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return {
      error: true,
      message: "Error al crear el usuario. Por favor, intente nuevamente.",
    };
  }
};

const uploadImage = async (image: File): Promise<string> => {
  try {
    const buffer = await image.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");
    const mimeType = image.type || "image/jpeg";

    const result = await claudinary.uploader.upload(
      `data:${mimeType};base64,${base64Image}`,
      { folder: "restaurant/users" },
    );

    return result.secure_url;
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw new Error("Error al procesar la imagen");
  }
};
