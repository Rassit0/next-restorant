"use server";

import { slugify } from "@/helpers/slugify";
import { prisma } from "@/lib/prisma";
import { v2 as claudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

export const updateProduct = async (formData: FormData) => {
  const image = formData.get("image");
  const slug = slugify(formData.get("name") as string);

  if (!image) {
    const product = {
      id: formData.get("id") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price") as string),
      stock: Number(formData.get("stock") as string),
      categoryId: formData.get("categoryId") as string,
      slug,
    };
    console.log({product})

    try {
      await prisma.product.update({
        where: { id: product.id },
        data: product,
      });

      revalidatePath("/admin/products");
      return {
        error: null,
        message: "Se actualizo el producto",
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        message: "Revise los logs del sistema",
      };
    }
  }

  try {
    const imageUrl = await uploadImage(image as File);

    const product = {
      id: formData.get("id") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price") as string),
      stock: Number(formData.get("stock") as string),
      image: imageUrl,
      categoryId: formData.get("categoryId") as string,
      slug,
    };

    await prisma.product.update({
      where: { id: product.id },
      data: product,
    });

    revalidatePath("/admin/products");

    return {
      error: null,
      message: "Se actualizo el producto",
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: "Revise los logs del sistema",
    };
  }
};

const uploadImage = async (image: File) => {
  try {
    const buffer = await image.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");
    const mimeType = image.type || "image/jpeg";

    return claudinary.uploader
      .upload(`data:${mimeType};base64,${base64Image}`)
      .then((response) => response.secure_url);
  } catch (error) {
    throw error;
  }
};
