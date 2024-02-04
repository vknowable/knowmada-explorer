import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Header from "./components/Header";

import { getLastBlock } from "@/lib/getBlock";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Knowmada Explorer",
  description: "Namada block explorer, by Knowable",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lastBlockData: Promise<BlockResponse> = getLastBlock()
  const lastBlock = await lastBlockData

  return (
    <html lang="en">
      <body className="grid grid-cols-[auto,1fr,1fr] grid-rows-[auto,1fr,auto,auto] gap-0 min-h-screen">
        <div className="col-span-3 lg:col-span-1 lg:row-span-2 lg:w-[250px]"><Navbar /></div>
        <div className="col-span-3 row-start-2 lg:col-span-2 lg:col-start-2 lg:row-start-1"><Header chainId={lastBlock.header.chain_id} /></div>
        <div className="col-span-3 row-start-3 lg:col-span-2 lg:col-start-2 lg:row-start-2">{children}</div>
        <div className="col-span-3 row-start-4 lg:col-span-3 lg:row-start-3 h-auto"><Footer /></div>
      </body>
    </html>
  );
}
