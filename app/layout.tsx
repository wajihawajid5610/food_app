import type { Metadata } from "next";
import { Geist_Mono, Geist } from 'next/font/google'
import localFont from "next/font/local";
import "./globals.css";
import NotificationBar from "./components/NotificationBar";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./components/AuthProvider";
import QuaryProvider from "./components/QuaryProvider";

/* const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
}); */

const geist = Geist({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Massimo Restaurant",
  description: "Best food in town!",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={geist.className}
      >
        <AuthProvider>
          <QuaryProvider>
            <NotificationBar />
            <NavBar />
            {children}
            <Footer />
            <ToastContainer position="bottom-right" theme="dark" autoClose={3000} />
          </QuaryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
