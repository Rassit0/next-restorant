import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/modules/shared";

const poppins = Poppins({subsets: ['latin'], weight:['400', '500', '600', '700', '800', '900']});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
  maximumScale: 1,
  userScalable: false
};

export const metadata: Metadata = {
  title: "Restaurante - Gestión de Pedidos",
  description: "Sistema de gestión de pedidos para restaurante con Next.js y Prisma",
  keywords: ["restaurante", "pedidos", "gestión", "next.js", "prisma"],
  authors: [{ name: "Mauricio Aramayo" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={poppins.className}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
