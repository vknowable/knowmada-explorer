import Searchbar from "./Searchbar";
import ChainId from "./ChainId";
import Link from "next/link";

export default function Header() {

  return (
    // <nav className="bg-black p-4 py-8 drop-shadow-xl z-10 border-b-2 border-light min-h-40 flex items-end min-w-full">
    //   <div className="flex justify-between items-end w-full">
    <div className="flex justify-between items-end w-full bg-black/30 p-4 px-8 border-b-2 border-light drop-shadow-xl z-10 gap-12">

      <Link href="/" className="flex flex-col items-center justify-center">
        <div className="flex justify-center gap-3 w-full">
          <div className="min-h-5 min-w-5 bg-nam01 animate-bounce animation-delay-300 opacity-60"></div>
          <div className="min-h-5 min-w-5 bg-nam02 animate-bounce animation-delay-600 opacity-60"></div>
          <div className="min-h-5 min-w-5 bg-nam03 animate-bounce animation-delay-400 opacity-60"></div>
          <div className="min-h-5 min-w-5 bg-nam04 animate-bounce animation-delay-150 opacity-60"></div>
          <div className="min-h-5 min-w-5 bg-nam05 animate-bounce animation-delay-500 opacity-60"></div>
          <div className="min-h-5 min-w-5 bg-nam06 animate-bounce animation-delay-200 opacity-60"></div>
        </div>
        <div className="mt-2 text-white text-center text-lg font-bold tracking-wide">Knowmada Explorer</div>
        <div className="text-center w-full text-white/50 text-center text-xs">by Knowable ( beta )</div>
      </Link>


      {/* <div className="h-20 min-w-72 bg-cover bg-no-repeat bg-bottom bg-logo-wordmark border border-red-500" style={{ backgroundSize: "contain", }}></div> */}
      <div className="w-full flex flex-col justify-end items-center">
        <div className="h-20 min-w-72 bg-cover bg-no-repeat bg-bottom bg-logo-wordmark mb-4" style={{ backgroundSize: "contain", }}></div>
        <Searchbar />
      </div>
      <ChainId />
    </div>
    //   </div>
    // </nav>
  )
}
