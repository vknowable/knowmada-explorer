import type { Metadata } from "next";
import { IM_Fell_Double_Pica, Inter, Noto_Emoji, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Header from "./components/Header";

// import { getLastBlock } from "@/lib/getBlock";
import { getChainStatus } from "@/lib/getChainStatus";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: 'swap', weight: ['300', '400'], variable: '--font-grotesk'})

export const metadata: Metadata = {
  title: "Knowmada Explorer",
  description: "Namada block explorer, by Knowable",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const lastBlockData: Promise<BlockResponse> = getLastBlock()
  // const lastBlock = await lastBlockData

  const chainStatusData: Promise<ChainStatus> = getChainStatus()
  const chainStatus = await chainStatusData

  return (
    <html lang="en" className={`${spaceGrotesk.variable} tracking-wide`}>
      <body className="grid grid-cols-[auto,1fr,1fr] grid-rows-[auto,1fr,auto,auto] gap-0 min-h-screen">
        <div className="col-span-3 lg:col-span-1 lg:row-span-2 lg:w-[250px]"><Navbar /></div>
        <div className="col-span-3 row-start-2 lg:col-span-2 lg:col-start-2 lg:row-start-1"><Header chainId={chainStatus.chain_id} epoch={chainStatus.epoch} /></div>
        <div className="col-span-3 row-start-3 lg:col-span-2 lg:col-start-2 lg:row-start-2">{children}</div>
        <div className="col-span-3 row-start-4 lg:col-span-3 lg:row-start-3 h-auto"><Footer /></div>
      </body>
    </html>
  );
}
