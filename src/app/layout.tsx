"use client";

import React from "react";
import "./globals.css";
import "./fonts.css";
import { SearchHeaderFactory } from "@/app/components/SearchHeader/search-header.component";
import { UserSearchProvider } from "@/app/context/UserSearchContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-geist-sans font-geist-mono antialiased">
        <UserSearchProvider>
          <SearchHeaderFactory />
          {children}
        </UserSearchProvider>
      </body>
    </html>
  );
}
