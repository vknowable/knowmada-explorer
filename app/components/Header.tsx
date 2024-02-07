import Searchbar from "./Searchbar";
import Image from "next/image";

type Props = {
  chainId: string,
  epoch: number,
}

export default function Header({ chainId, epoch }: Props) {
  
  return (
    <nav className="bg-black p-4 py-8 drop-shadow-xl z-10 border-b-2 border-light min-h-40 flex items-end">
      <div className="flex justify-between items-end w-full gap-14">
        <div className="h-20 min-w-72 bg-cover bg-no-repeat bg-bottom bg-logo-wordmark" style={{ backgroundSize: "contain", }}></div>
        <div className="w-full">
          <Searchbar />
        </div>
        <div className="flex flex-col items-start">
          <div className="text-md font-normal text-white">Chain-id:</div>
          <div className="text-sm text-yellow" style={{ whiteSpace: 'nowrap' }}>{chainId}</div>
          <div className="text-sm font-light text-white mt-2 flex items-baseline">Current Epoch:<span className="text-sm font-light text-yellow ml-2">{epoch}</span></div>
        </div>
      </div>
    </nav>
  )
}
