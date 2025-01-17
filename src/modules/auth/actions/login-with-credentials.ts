"use server"

import { signIn } from "@/auth"
import { revalidatePath } from "next/cache";

export const loginWithCredentials = async (email: string, password: string) => {
    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
            redirectTo: "/admin/home"
        });

        revalidatePath('/auth/login', "layout");

        return {
            error: false,
            message: "Bienvenido al sistema"
        }
    } catch (error) {
        console.log(error)
        return {
            error: true,
            message: "Revisar los logs del sistema"
        }
    }
}