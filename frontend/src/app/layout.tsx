import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
import SessionProvider from "./SessionProvider";
import Web3ModalProvider from '@/context/web3';
import { ToastContainer } from 'react-toastify';
import { cookieToInitialState } from 'wagmi';
import { config } from '@/utils/web3';
import { headers } from 'next/headers';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Champion",
  description: "Blockchain Jewelry Shop",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    config,
    (await headers()).get('cookie')
  );
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <SessionProvider>
          <Navbar />
          <main className="m-auto min-w-[300px] max-w-7xl p-4">
            <Web3ModalProvider initialState={initialState}>
              {children}
            </Web3ModalProvider>
            <ToastContainer />
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
