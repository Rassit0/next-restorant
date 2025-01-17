import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";



export async function GET(request: Request){

    // Primero borra todos los usuarios de la base de datos
    await prisma.user.deleteMany();

    const users = await prisma.user.createMany({
        data: [
            {
                email: "admin@rasstech.com",
                name: "RassTech",
                password: bcrypt.hashSync("Admin123"),
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s"
            },
            {
                email: "mauricio@rasstech.com",
                name: "Mauricio Aramayo",
                password: bcrypt.hashSync("Admin123"),
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s"
            },
        ]
    });

    return NextResponse.json({
        users
    })
}