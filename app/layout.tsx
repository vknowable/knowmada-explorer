import type { Metadata } from "next";
import { Space_Grotesk as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Provider as JotaiProvider } from "jotai";


// const inter = Inter({ subsets: ["latin"] });
// const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: 'swap', weight: ['300'], variable: '--font-grotesk'})
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Knowmada Explorer",
  description: "Namada block explorer, by Knowable",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <JotaiProvider>
    {/* <html lang="en" className={`${spaceGrotesk.variable} tracking-wide`}> */}
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
      )}>
      <div className="grid grid-cols-[auto,1fr,1fr] grid-rows-[auto,1fr,auto,auto] gap-0 min-h-screen">
        <div className="col-span-3 row-start-2 lg:col-span-1 lg:row-span-1 lg:row-start-2"><Navbar /></div>
        <div className="col-span-3 row-start-1 lg:col-span-3 lg:col-start-1 lg:row-start-1"><Header /></div>
        <div className="col-span-3 row-start-3 lg:col-span-2 lg:col-start-2 lg:row-start-2">{children}</div>
        <div className="col-span-3 row-start-4 lg:col-span-3 lg:row-start-3 h-auto"><Footer /></div>
      </div> 
      </body>
    </html>
    </JotaiProvider>
  );
}
