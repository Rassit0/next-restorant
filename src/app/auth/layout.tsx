// snnipet lrc

import Image from "next/image";
import AuthImage from '@/assets/images/auth-image.png'
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: React.ReactNode; }) {

    const session = await auth();

    if(session?.user){
        redirect('/admin/home');
    }

    return (
        <main className="auth__layout">
            <section className="flex items-center justify-center w-full">
                <Image
                    src={AuthImage}
                    width={800}
                    height={800}
                    priority={true}
                    alt="Auth Layout"
                />
            </section>
            {children}
        </main>
    );
}