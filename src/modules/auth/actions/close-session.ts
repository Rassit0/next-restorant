"use server"

import { signOut } from "@/auth"
import { revalidatePath } from "next/cache";

export const closeSession = async () => {
    await signOut();
    revalidatePath('/');
}