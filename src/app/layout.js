import { Inter } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/components/AuthProvider";

export const metadata = {
  title: "Island Of Dreams",
  description: "An Island For Your Dreams",
  icons: {
    icon: "/images/icon-island-of-dreams.ico",
  },
};

const inter = Inter({
  weight: ['200', '300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={inter.className}>
      <body className="bg-[url('/images/bg-island-of-dreams.png')] bg-cover bg-center h-dvh w-full overflow-hidden md:overflow-visible sm:overflow-visible">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
};
