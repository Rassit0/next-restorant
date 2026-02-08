import NextAuth from "next-auth"
import { authProviders } from "./auth.providers"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { Prisma } from "@prisma/client"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(Prisma),
    providers: authProviders,
    pages: {
        signIn: '/auth/login' // La pagina de autenticacion se aloja en nuestro login
    },
    session: {
        strategy: "jwt",
        maxAge: 86000 // expira en 24 horas creo
    }
})