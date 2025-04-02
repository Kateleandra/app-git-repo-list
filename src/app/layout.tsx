import React from "react";
import "./globals.css";
import "./fonts.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lista de repositórios do GitHub",
  description:
    "Este projeto é uma aplicação web desenvolvida com Next.js, que permite a busca e listagem de repositórios de usuários do GitHub.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-geist-sans font-geist-mono antialiased">
        {children}
      </body>
    </html>
  );
}
