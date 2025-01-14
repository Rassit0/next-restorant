"use server"

import { slugify } from "@/helpers/slugify";
import { prisma } from "@/lib/prisma";
import { v2 as claudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface ICreateCategory {
    name: string;
    image: File | string;
    slug: string;
}

export const createCategory = async (formData: FormData) => {
    const category = {
        name: formData.get('name'),
        image: formData.get('image'),
        slug: ''
    } as ICreateCategory

    try {

        // SUBIR IMAGEN
        const imageUrl = await uploadImage(category.image as File);
        category.image = imageUrl;

        // CREAR SLUG
        const slug = slugify(category.name);
        category.slug = slug;

        // VALIDAR CATEGORIA
        const categoryExists = await prisma.category.findFirst({
            where: {
                slug
            }
        })

        if (categoryExists) {
            return {
                error: true,
                message: "Ya se registro una categoria con este nombre"
            }
        }

        // GUARDAR CATEGORIA
        await prisma.category.create({
            data: {
                ...category,
                image: category.image as string,
            }
        });

        // redirect('/admin/categories');
        revalidatePath('/admin/categories');

        return {
            error: null,
            message: "Se guardo la categoría"
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: "Revice los logs del sistema"
        }
    }
}

const uploadImage = async (image: File) => {
    try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');

        return claudinary.uploader.upload(`data:image/png;base64,${base64Image}`)
            .then(response => response.secure_url);
    } catch (error) {
        throw error
    }
}