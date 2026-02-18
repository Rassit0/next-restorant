"use server"

import { prisma } from "@/lib/prisma"
import { User } from "@prisma/client";

export const getUsers = async (): Promise<User[]> => {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                name: 'asc'
            }
        });

        return users;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw new Error('No se pudieron cargar los usuarios');
    }
}