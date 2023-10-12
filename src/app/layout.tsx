import clsx from "clsx";
import "./globals.css";
import type {Metadata} from "next";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Test",
  description: "A place to test things",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "max-w-3xl mx-auto")}>
        {children}
      </body>
    </html>
  );
}
