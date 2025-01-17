"use server"

import { prisma } from "@/lib/prisma";
import bcrypt from 'bcryptjs';

export const validateCredentials = async (email: string, password: string) => {

    if (!email || !password) return null;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return null;

    if (!bcrypt.compareSync(password, user.password ?? '')) return null;

    return user;

}