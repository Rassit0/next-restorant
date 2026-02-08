//snipet lrc

import { auth } from "@/auth";
import { SideCart } from "@/modules/cart";
import { NavMenu, SideMenu } from "@/modules/shared";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode; }) {

    const session = await auth();

    if (!session?.user) {
        redirect('/auth/login');
    }

    return (
        <div className="admin__layout">
            <SideMenu />
            <SideCart />
            <main className="admin__layout--main">
                <NavMenu
                    user={session.user}
                />
                {children}
            </main>
        </div>
    );
}