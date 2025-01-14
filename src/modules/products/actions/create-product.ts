"use server"
import { slugify } from '@/helpers/slugify';
import { prisma } from '@/lib/prisma';
import { v2 as claudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

export const createProduct = async (formData: FormData) => {

    const slug = slugify(formData.get('name') as string);

    try {

        const productExists = await prisma.product.findFirst({
            where: { slug: slug }
        })

        if(productExists){
            return{
                error: true,
                message: "El producto ya existe"
            }
        }

        const image = formData.get('image');
        const imageUrl = await uploadImage(image as File);

        await prisma.product.create({
            data: {
                name: formData.get('name') as string,
                description: formData.get('description') as string,
                price: +formData.get('price')!,
                stock: +formData.get('stock')!,
                categoryId: formData.get('categoryId') as string,
                image: imageUrl,
                slug
            }
        })

        revalidatePath('/admin/products');

        return {
            error: null,
            message: "Se creo el producto exitosamente"
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

        return claudinary.uploader.upload(`data:image/png;base64,${base64Image}`)
            .then(response => response.secure_url);
    } catch (error) {
        throw error
    }
}