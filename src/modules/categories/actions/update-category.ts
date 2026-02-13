"use server"

import { slugify } from "@/helpers/slugify";
import { prisma } from "@/lib/prisma";
import { v2 as claudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

export const updateCategory = async (formData: FormData) => {

    const image = formData.get('image');
    const slug = slugify(formData.get('name') as string);

    if (!image) {
        const category = {
            id: formData.get('id') as string,
            name: formData.get('name') as string,
            slug
        }

        try {
            await prisma.category.update({
                where: { id: category.id },
                data: category
            })

            revalidatePath('/admin/categories')
            return {
                error: null,
                message: "Se actualizo la categoría"
            }
        } catch (error) {
            console.log(error)
            return {
                error: true,
                message: "Revise los logs del sistema"
            }
        }
    }

    try {
        const imageUrl = await uploadImage(image as File)

        const category = {
            id: formData.get('id') as string,
            name: formData.get('name') as string,
            image: imageUrl,
            slug
        }

        await prisma.category.update({
            where: { id: category.id },
            data: category
        })

        revalidatePath('/admin/categories')

        return {
            error: null,
            message: "Se actualizo la categoría"
        }
    } catch (error) {
        console.log(error)
        return {
            error: true,
            message: "Revise los logs del sistema"
        }
    }
}

const uploadImage = async (image: File) => {
    try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');
        const mimeType = image.type || 'image/jpeg';

        return claudinary.uploader.upload(`data:${mimeType};base64,${base64Image}`)
            .then(response => response.secure_url);
    } catch (error) {
        throw error
    }
}